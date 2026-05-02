import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './skillType'
import { projectType } from './projectType'
import { resumeType } from './resumeType'
import { beyondItemType } from './beyondItemType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType, projectType, resumeType, beyondItemType],
}
