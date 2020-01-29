using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NextGenApis.Models;

namespace NextGenApis.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult MediaRecorder()
        {
            return View();
        }

        public IActionResult SpeakerRecognition()
        {
            return View();
        }

        public IActionResult SpeakerRecognitionDemo()
        {
            return View();
        }

        public IActionResult SpeechRecognition()
        {
            return View();
        }

        public IActionResult LanguageUnderstanding()
        {
            return View();
        }

        public IActionResult WebSpeech()
        {
            return View();
        }

        public IActionResult SmartApi()
        {
            return View();
        }

        public IActionResult SmartApisDemo()
        {
            return View();
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
