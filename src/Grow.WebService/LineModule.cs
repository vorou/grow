using System;
using System.Collections.Generic;
using Nancy;
using Nancy.ModelBinding;

namespace Grow.WebService
{
    public class LineModule : NancyModule
    {
        private static readonly List<Line> lines = new List<Line>();

        public LineModule()
        {
            Get["/lines"] = _ => lines;

            Post["/lines"] = _ =>
                             {
                                 var line = this.Bind<Line>();
                                 line.Id = Guid.NewGuid();
                                 lines.Add(line);
                                 return line;
                             };
        }
    }

    public class Line
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}