import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './skillType'
import { projectType } from './projectType'
import { resumeType } from './resumeType'
import { beyondItemType } from './beyondItemType'
import { milestoneType } from './milestoneType'
import { blogType } from './blogType'
import { planetMarkType } from './planetMarkType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType, projectType, resumeType, beyondItemType, milestoneType, blogType, planetMarkType],
}
