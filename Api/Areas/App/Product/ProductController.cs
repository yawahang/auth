using Core.Domain.Product.DTOs;
using Core.Domain.Product.Service;
using Microsoft.AspNetCore.Mvc;

namespace Api.Areas.App.Product;

[ApiController]
[Route("api/products")]
public class ProductController(IProductService productService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetAll()
    {
        return Ok(await productService.GetAllAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductReadDto>> GetById(int id)
    {
        var result = await productService.GetByIdAsync(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<ProductReadDto>> Create([FromBody] ProductCreateDto dto)
    {
        var product = await productService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProductUpdateDto dto)
    {
        if (id != dto.Id)
        {
            return BadRequest("Route id does not match payload id.");
        }

        if (!await productService.ExistsAsync(id))
        {
            return NotFound();
        }

        await productService.UpdateAsync(dto);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!await productService.ExistsAsync(id))
        {
            return NotFound();
        }

        await productService.DeleteAsync(id);
        return NoContent();
    }
}
