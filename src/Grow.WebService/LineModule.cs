using Nancy;

namespace Grow.WebService
{
    public class LineModule : NancyModule
    {
        public LineModule()
        {
            Post["/lines"] = _ => new {id = "123", name = "panda"};
        }
    }
}