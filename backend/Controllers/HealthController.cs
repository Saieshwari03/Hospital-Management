using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("health")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHealth()
        {
            return Ok(new
            {
                status = "healthy",
                application = "MediShield AI",
                version = "1.0.0"
            });
        }
    }
}
