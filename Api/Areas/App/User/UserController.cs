using Core.Domain.Auth.DTOs;
using Core.Domain.User.DTOs;
using Core.Domain.User.Service;
using Microsoft.AspNetCore.Mvc;

namespace Api.Areas.App.User;

[ApiController]
[Route("api/users")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery] string? email)
    {
        var users = string.IsNullOrWhiteSpace(email)
            ? await userService.GetAllAsync()
            : await userService.SearchByEmailAsync(email);

        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserDto>> GetById(int id)
    {
        var user = await userService.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpPost("activate")]
    public async Task<IActionResult> Activate([FromBody] ActivatePageDto activatePageDto)
    {
        var user = await userService.GetByEmailAsync(activatePageDto.Email);
        if (user == null)
        {
            return NotFound();
        }

        await userService.UpdateAsync(new UserUpdateDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Status = true
        });

        return Ok(new { status = true });
    }

    [HttpGet("is-active")]
    public async Task<ActionResult<bool>> IsActive([FromQuery] string email)
    {
        var user = await userService.GetByEmailAsync(email);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user.Status);
    }
}
