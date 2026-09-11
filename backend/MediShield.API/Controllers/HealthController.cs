using Microsoft.AspNetCore.Mvc;

namespace MediShield.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "Healthy",
            service = "MediShield AI API",
            timestamp = DateTime.UtcNow
        });
    }
}