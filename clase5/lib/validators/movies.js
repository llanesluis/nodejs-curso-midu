import z from 'zod'

const MovieSchema = z.object({
  // id: z.string().uuid(),
  title: z.string(),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({ message: 'Poster must be a valid URL' }),
  genre: z.string().array(),
  rate: z.number().min(0).max(10)
})

// export type Movie = z.infer<typeof MovieSchema>

export function validateMovie (input) {
  // safeParse() regresa un objeto dif, dependiendo si fue error o no
  return MovieSchema.safeParse(input)
  // return MovieSchema.parse(input)
}

export function validatePartialMovie (input) {
  // partial() convierte todas las propiedades en opcionales, valida corretamente las que se pasen
  return MovieSchema.partial().safeParse(input)
}
