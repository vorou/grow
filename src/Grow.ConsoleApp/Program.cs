using System;
using System.Collections.Generic;

namespace Grow.ConsoleApp
{
    public class Program
    {
        private static readonly Dictionary<string, ICollection<DateTime>> Tracks = new Dictionary<string, ICollection<DateTime>>();

        private static DateTime CurrentDay
        {
            get
            {
                return DateTime.UtcNow.Date;
            }
        }

        private static void Main(string[] args)
        {
            while (true)
            {
                Console.Out.Write("grow> ");
                var input = Console.ReadLine();
                if (string.IsNullOrWhiteSpace(input))
                    return;

                if (input.StartsWith("add"))
                {
                    var track = GetTrack(input);
                    if (!Tracks.ContainsKey(track))
                        Tracks.Add(track, new HashSet<DateTime>());
                }

                if (input.StartsWith("rm"))
                {
                    var track = GetTrack(input);
                    if (Tracks.ContainsKey(track))
                        Tracks.Remove(track);
                }

                if (input.StartsWith("did"))
                {
                    var when = CurrentDay;
                    if (input.Split().Length == 3)
                        when = CurrentDay.AddDays(int.Parse(input.Split()[2]));
                    var track = Tracks[GetTrack(input)];
                    if (track.Contains(when))
                        track.Remove(when);
                    else
                        track.Add(when);
                }

                ShowTracks();
            }
        }

        private static string GetTrack(string input)
        {
            return input.Split()[1];
        }

        private static void ShowTracks()
        {
            foreach (var track in Tracks)
            {
                Console.Out.WriteLine(track.Key);
                foreach (var date in track.Value)
                    Console.Out.WriteLine(date.ToShortDateString());
            }
        }
    }
}