namespace Core.Domain.Product.DTOs;

public record ProductReadDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required decimal Price { get; set; }
}
