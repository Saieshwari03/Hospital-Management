using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetDashboard()
        {
            var dashboard = new
            {
                securityScore = 86,
                criticalThreats = 3,
                vulnerabilities = 27,
                securityEvents = 142
            };

            return Ok(dashboard);
        }
    }
}