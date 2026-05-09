import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './skillType'
import { projectType } from './projectType'
import { resumeType } from './resumeType'
import { beyondItemType } from './beyondItemType'
import { milestoneType } from './milestoneType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType, projectType, resumeType, beyondItemType, milestoneType],
}
