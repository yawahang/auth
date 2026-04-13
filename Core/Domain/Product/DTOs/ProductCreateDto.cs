namespace Core.Domain.Product.DTOs;

public record ProductCreateDto
{
    public required string Name { get; set; }
    public required decimal Price { get; set; }
}
