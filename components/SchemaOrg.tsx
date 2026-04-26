type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[]

type JsonLdObject = {
  [key: string]: JsonLdValue
}

type SchemaOrgProps<T extends JsonLdObject> = {
  schema: T
  id?: string
}

export function SchemaOrg<T extends JsonLdObject>({ schema, id }: SchemaOrgProps<T>) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
