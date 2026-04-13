namespace Core.DataAccess.Context.Entities;

public record User
{
    public int Id { get; set; }
    public string? FullName { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public bool Status { get; set; }
    public string? RefreshTokens { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public DateTime CreatedDate { get; set; }
}
