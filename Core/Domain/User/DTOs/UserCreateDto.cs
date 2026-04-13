namespace Core.Domain.User.DTOs;

public record UserCreateDto
{
    public string? FullName { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public bool Status { get; set; }
}
