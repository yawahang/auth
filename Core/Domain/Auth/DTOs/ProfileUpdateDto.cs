namespace Core.Domain.Auth.DTOs;

public record ProfileUpdateDto
{
    public required int Id { get; set; }
    public string? FullName { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public required bool Status { get; set; }
    public string? RefreshTokens { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public required DateTime CreatedDate { get; set; }
}
