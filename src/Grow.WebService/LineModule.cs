using System;
using System.Collections.Generic;
using Nancy;
using Nancy.ModelBinding;

namespace Grow.WebService
{
    public class LineModule : NancyModule
    {
        public LineModule()
        {
            var lines = new List<Line>();

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