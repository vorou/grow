using System;
using System.Collections.Generic;
using Nancy;
using Nancy.ModelBinding;

namespace Grow.WebService
{
    public class LineModule : NancyModule
    {
        private static readonly Dictionary<Guid, Line> lines = new Dictionary<Guid, Line>();

        public LineModule()
        {
            Get["/lines"] = _ => lines.Values;

            Post["/lines"] = _ =>
                             {
                                 var line = this.Bind<Line>();
                                 line.Id = Guid.NewGuid();
                                 lines.Add(line.Id, line);
                                 return line;
                             };

            Delete["/lines/{id}"] = _ => lines.Remove(_.id);
        }
    }

    public class Line
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}