const z = require('zod')

const categoryBody = z.object({
name : z.string(),
description : z.string().optional(),
image : z.string().optional(),
tax : z.number().optional(),
taxApplicability : z.boolean(),
taxType : z.string().optional()
}
)

const subCategoryBody = z.object({
  name : z.string(),
  description : z.string().optional(),
  image : z.string().optional(),
  tax : z.number().optional(),
  taxApplicability : z.boolean().optional(),
  categoryId: z.string()
}
)

const itemBody = z.object({
  name : z.string(),
  description : z.string().optional(),
  image : z.string().optional(),
  tax : z.number().optional(),
  taxApplicability : z.boolean().optional(),
  baseAmount:z.number(),
  discount:z.number().optional(),
  totalAmount:z.number().optional(),
  subCategoryId: z.string().optional(),
  categoryId: z.string().optional()
}
)

const updateCategoryBody = z.object({
  name : z.string().optional(),
  description : z.string().optional(),
  image : z.string().optional(),
  tax : z.number().optional(),
  taxApplicability : z.boolean().optional(),
  taxType : z.string().optional()
})

const updateSubCategoryBody = z.object({
  name : z.string().optional(),
  description : z.string().optional(),
  image : z.string().optional(),
  tax : z.number().optional(),
  taxApplicability : z.boolean().optional(),
  categoryId: z.string().optional()
})

const updateItemsBody = z.object({
  name : z.string().optional(),
  description : z.string().optional(),
  image : z.string().optional(),
  tax : z.number().optional(),
  taxApplicability : z.boolean().optional(),
  baseAmount:z.number().optional(),
  discount:z.number().optional(),
  totalAmount:z.number().optional(),
  subCategoryId: z.string().optional(),
  categoryId: z.string().optional()
}
)

module.exports = {
categoryBody,
subCategoryBody,
itemBody,
updateCategoryBody,
updateSubCategoryBody,
updateItemsBody
}