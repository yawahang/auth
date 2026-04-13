namespace Core.Domain.Auth.DTOs;

public record RegisterDto
{
    public required string FullName { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }
}
