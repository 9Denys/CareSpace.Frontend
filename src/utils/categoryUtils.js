export const initialCategoryFormData = {
    name: '',
    description: '',
}

export function filterCategories(categories, searchValue) {
    return categories.filter((category) =>
        category.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    )
}
