namespace Core.Domain.User.DTOs;

public record UserDto
{
    public int Id { get; set; }
    public string? FullName { get; set; }
    public required string Email { get; set; }
    public bool Status { get; set; }
    public DateTime CreatedDate { get; set; }
}
