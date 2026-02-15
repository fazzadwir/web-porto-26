import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // 1. Title & Slug
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    // 2. Short Description
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),

    // 3. Project Overview (Boxed)
    defineField({
      name: 'projectOverview',
      title: 'Project Overview',
      type: 'text',
      rows: 5,
    }),

    // 4. Metadata Grid
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies (Tools)',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // 5. Main Image (Thumbnail)
    defineField({
      name: 'mainImage',
      title: 'Main Image (Thumbnail)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),

    // 6. Body Content
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),

    // 7. Showcase Images
    defineField({
      name: 'showcaseImage1',
      title: 'Showcase Image (First - Full Width)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    
    defineField({
      name: 'showcaseImagesTwoColumn',
      title: 'Showcase Images (Two Column)',
      type: 'array',
      of: [
        {
           type: 'image',
           options: { hotspot: true },
           fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        }
      ],
      validation: Rule => Rule.max(2).warning('Only first 2 images will be shown in the two-column layout'),
    }),

    defineField({
      name: 'showcaseImageLast',
      title: 'Showcase Image (Last - Full Width)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),


    // 8. Closing Statement
    defineField({
      name: 'closingStatement',
      title: 'Closing Statement',
      type: 'text',
      rows: 3,
    }),

    // System/Legacy Fields (Kept at the bottom)
    defineField({
      name: 'overview',
      title: 'Legacy Overview',
      type: 'text',
      hidden: true, 
    }),

    defineField({
      name: 'status',
      title: 'Project Visibility',
      type: 'string',
      options: {
        list: [
          { title: 'Public (Clickable)', value: 'public' },
          { title: 'Private / Coming Soon (Not Clickable)', value: 'private' },
        ],
      },
      initialValue: 'public',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
