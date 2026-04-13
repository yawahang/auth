namespace Core.Domain.Auth.DTOs;

public record ActivatePageDto
{
    public required string Email { get; set; }
}
