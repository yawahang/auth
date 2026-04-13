namespace Core.Shared.DTOs;

public record ErrorResponse
{
    public int StatusCode { get; set; }
    public required string Message { get; set; }
}
