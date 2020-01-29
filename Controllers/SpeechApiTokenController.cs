using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace NextGenApis.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SpeechApiTokenController : ControllerBase
    {
        private readonly ILogger<SpeechApiTokenController> _logger;
        public SpeechApiTokenController(ILogger<SpeechApiTokenController> logger)
        {
            _logger = logger;
        }


        //SpeechApiToken
        [HttpGet]
        public string Get()
        {
            var rng = new Guid();
            return rng.ToString();
        }

    }
}