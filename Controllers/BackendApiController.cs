using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace NextGenApis.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BackendApiController : ControllerBase
    {

        private readonly ILogger<BackendApiController> _logger;
        public BackendApiController(ILogger<BackendApiController> logger)
        {
            _logger = logger;
        }

        //BackendApi/InvokeStudentApi/arnab
        [HttpGet("/BackendApi/InvokeStudentApi/{name}")]
        public Student GetStudent(string name)
        {
            var studentResp = new Student()
            {
                StudentName = name
            };
            return studentResp;
        }


        //BackendApi/InvokeWebsiteApi/google
        [HttpGet]
        [Route("/BackendApi/AccountBalanceEnquiry/{accountNumber}")]
        public GraphQLResponse GetAccountById(int accountNumber)
        {
            var acctInfoByIdObj = new AccountInformationByAccountId()
            {
                accountId= accountNumber,
                textInfo= $"Account id {accountNumber.ToString()} has account balance of 25000 and available balance 125000"

            };
            var dataObj = new Data()
            {
                accountInformationByAccountId= acctInfoByIdObj
            };
            var gqlResponse = new GraphQLResponse()
            {
                data = dataObj
            };
            return gqlResponse;
        }
        
    }

    public class Student { 
        public string StudentName { get; set; }
    }

    public class GraphQLResponse
    {
        public Data data { get; set; }
    }
    public class Data
    {
        public AccountInformationByAccountId accountInformationByAccountId { get; set; }
    }

    public class AccountInformationByAccountId
    {
        public int accountId { get; set; }
        public string textInfo { get; set; }
    }
}