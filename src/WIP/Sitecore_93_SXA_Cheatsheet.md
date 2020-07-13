---
title: Sitecore 9.3 SXA cheat sheet
date: '2020-05-08'
spoiler: A cheat sheet for Sitecore 9.3 SXA without C# coding.
---

# Introduction
Sitecore has traditionally been a very extensible but code-centric platform. Every project consisted of a lot of C# code, MVC code, and Razor views. With Sitecore 9.3 and SXA a large part of the UI related C# code can be replaced by configuration and other types of code:
- Scriban for server-rendered HTML (new in 9.3)
- SASS for styling
- JavaScript/ES6 or TypeScript for the front-end code

While dissecting SXA on my journey to find a way for front-end developer centric Sitecore web-site development I made some notes for myself that might be useful for others as well. Let me know if you see mistakes or have any additions.

# Terminology
The Sitecore documentation and the Sitecore UI is not consistent in terminology. I will use the **bold** terms in this cheat sheet:
- **rendering** == component == variant 
- **rendering variant** == variant definition

I use the term *rendering instance* for a rendering added to a page.

In the specified paths in the cheat sheet I use identifiers for elements in the paths. The following identifiers are used:

- `<tenant>` - the name of the tenant
- `<site>` - the name of the site
- `<layer>` - the Helix layer: `Foundation`, `Feature` or `Project`
- `<module>` - the name of the module
- `<functionality>` - point to a functionality explained in context
- `<rendering category>` - grouping name of multiple renderings
- `<rendering>` - the name of a rendering
- `<rendering folder>` - the name of the folder to organize renderings in

# SXA structure
SXA has concept of **tenants** and **sites**:
- **Tentants** can optionally be managed in a **tenant folder**.
- **Sites** can optionally be managed in a **site folder**.

**Tentant** (with all modules selected) has configured on item:
- **Templates location** - `/sitecore/Templates/Project/<tenant>`
- **Themes location** - `/sitecore/Media Library/Themes/<tenant>`
- **Media Library location** - `/sitecore/Media Library/Project/<tenant>`
- **Shared Media Library location** - `/sitecore/Media Library/Project/<tenant>/shared`
- **Modules** - set of selected modules for tenant, all named `<functionality> Tenant Setup`, where \<functionality\> one of: Composites, Content Validation, Error Handling, Forms, JSON, Navigation, Redirects, Search, Security, SiteMetadata, StickyNotes, Taxonomy, Editing, Grid, Local Datasources, Multisite, MVC, Presentation, Scaffolding, Theming

**Site** (with all modules selected) has configured on item:
- **Site Media Library** - `/sitecore/Media Library/Project/<tenant>/<site>`
- **Themes Folder** - `/sitecore/Media Library/Themes/<tenant>/<site>`
- **Modules** - set of selected modules for site, all named `<functionality> Site Setup`, where \<functionality\> one of: Content Tokens, Creative Exchange, Local Datasources, Overlays, Redirects, Editing, Grid, Multisite, Placeholder Settings, Presentation, Accessibility, Analytics, Compliance, Composites, Context, Engagement, Events, Forms, Generic Meta Rendering, Geospatial, JSON,  Layout Services, Maps, Media, Navigation, Page Content, Page Structure, Search, Security, SiteMetadata, Social, StickyNotes, Taxonomy, Search, Theming 
- **Forms folder location** - `/sitecore/Forms/<tenant>/<site>`
- **Role domain**: ?TODO what does this?
  
**Site** has sub-items:
- `Home` - contains site pages + `Overlays` -> presentation elements in overlay windows
- `Media` - site-specific media items
  - `<site>` - ref to `/sitecore/Media Library/Project/<tenant>/<site>`
  - `shared` - ref to `/sitecore/media library/Project/<tenant>/shared`
- `Data` - data sources reusable accross multiple pages, organized by rendering type
  <br/>For each rendering: `Insert <rendering>`; `Insert > <rendering folder>` to organize data sources
- `<site> Dictionary` - translations for Scriban template ?TODO - what means "template"?
  <br/>`Insert > dictionary entry`; `Insert > dictionary folder`
- `Presentation` - presentation details defined at site level
  - `Available Renderings` - component categories in Experience Editor toolbox
    <br/>Field `Data:Renderings` contains links to renderings (`/sitecore/layout/Renderings/Feature/<module>/<rendering category>/<rendering>`)
  - `Cache Settings` - Set [SXA caching options for renderings](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/set-sxa-caching-options.html)
    <br/>`Insert > Component Cache Settings` - Field `Caching:Rendering` contains renderings to cache
  - `Event Types` - select available event types within event lists ?TODO - from docs, unclear?
    <br/>`Insert > Style` - Fields `Style:Value`,`Style:Allowed Renderings`, `Style:Verified style`
  - `Layout Service` - specify additional JSON Rendering Variants
    <br>`Insert > JSON Rendering Variant Definition` - Fields:
  - `Page Designs` - [specify layouts for pages](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/create-and-assign-a-page-design-in-the-content-editor.html)
    <br/>`Insert > Page Design Folder`; Insert > `Page Design`
  - `Partial Designs` - [specify sets of renderings for consistant style](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/create-and-change-a-partial-design.html) 
    <br/>`Insert > Partial Design Folder`; `Insert > Partial Design`; `Insert > Metadata Partial Design`
  - `Placeholder Settings` - [set placeholder restrictions](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/set-placeholder-restrictions.html) to configure which renderings may go in which placeholders
    <br/>`Insert > Placeholder` - Fields `Data:Placeholder Key`, `Allowed Controls`, ...; Insert `Placeholder Settings Folder`
  - `POI Types` - configure visualization of[your points of interest](https://doc.sitecore.com/users/sxa/19/sitecore-experience-accelerator/en/add-a-point-of-interest.html), useful places on a map
    <br/>`Insert > POI Type` - Fields: `Properties:POI Icon`, `Styling:Default Variant` 
  - `Rendering Variants` - renderings ("variant") with their rendering variant ("variant definition"), variant definitions can be built using Scriban
  - `Styles` - [define preset styles for renderings](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/add-a-style-for-a-rendering.html)
    <br/>`Insert > Styles`; `Insert > Style` - Fields:`Style:Value`, `Style:Allowed Renderings`
- `Settings` - configuration details defined at site level
  - `Browser Title` - variant definition specific for the browser title (default `Title` field, can be Scriban)
  - `Creative Exchange Storages` - export/import options - not relevant!
  - `Datasource Configurations` - configure datasource options per rendering (override on default)
    `Insert > Datasource Configuration` - Fields: `Datasource configuration:Datasource Roots Locations`, ...
  - `Default links` - configurations for the link rendering
  - `Facets` - [configure facets](https://doc.sitecore.com/users/sxa/19/sitecore-experience-accelerator/en/sxa-search-facets,-scopes,-and-tokens.html) used by the search components
  - `HTML Snippets` - meta component that you can add to the `Metadata Partial Design`
    <br/>`Insert > HTML Snippet` - Fields: `HTML Snippet:Html`; Insert `HTML Snippet Folder`
  - `Item Queries` - Create custom queries for list components
    <br/>`Insert > Query` - Fields: `Query:Query`, `Rules:Filtering rules ...`; `Insert > Item Queries Folder` 
  - `Maps Provider` - [store maps authorization key](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/configure-the-map-provider.html)
  - `Privacy Warning` - configure the privacy warning
  - `Redirect` - [add redirect mappings](https://doc.sitecore.com/users/sxa/19/sitecore-experience-accelerator/en/map-a-url-redirect.html) between old and new url's (may use wildcards)
    <br/>`Insert > Redirect Map`; `Insert > Redirect MapGrouping`
  - `Scopes` - add search scopes with boosting rules
    <br/>`Insert > Scope` - Fields: `Scope:Scope Query`, `Boosting:Rule`; `Insert > Scopes Folder`
  - `Shared Sites Settings` - configure [Delegated Areas](https://doc.sitecore.com/users/sxa/19/sitecore-experience-accelerator/en/share-content-as-a-delegated-area.html) to share pages, content, presentation and data sources between sites in same tenant
  - `Site Grouping` - manage Sitecore site definitions using the [SXA Site Manager](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/manage-multiple-sites-with-the-sxa-site-manager.html). Can also [add custom providers](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/add-and-select-a-custom-link-provider.html) and [assign login page](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/manage-multiple-sites-with-the-sxa-site-manager.html)
  - `Social Media Groups` - manage social media buttons and their code snippets
    <br/>`Insert > Social Media Buttons`
  - `Twitter Apps` - Configure Twitter credentials
    <br/>`Insert > Twitter App` - Fields: `Application:Consumer Key`, `Application:Consumer Secret`, ...

# Setting up a new tenant and site
A new tenant [TODO]

## New tenant
New tenant creates template folder `/sitecore/Templates/Project/<tenant>` with sub-items specifying the selected base templates (Field: `Data:Base template`):
- `Home` - Page, Home
- `Page` - Page, _HasValidUrlName, _Navigable, _Page Search Scope, _Searchable, _Custom Metadata, _OpenGraph Metadata, _Seo Metadata, _Sitemap, _Twitter Metadata, _Sticky Note, _Taggable, _Local Data Link, _Designable, _Styleable
- `Page Design` - Page Design, _Sticky Note, _Page Design Theme
- `Page Design Folder` - Page Design Folder
- `Page Designs` - Page Designs, _Asset Optimization, _Site Theme
- `Partial Design` - Partial Design, _Sticky Note
- `Partial Design Folder` - Partial Design Folder
- `Partial Designs` - Partial Designs
- `Settings` - Settings, _Composite Theme, _Error Handling, _Search Criteria, _Favicon, _Robots Content, _SitemapSettings, _Datasource Behaviour, _Editing Theme, _Grid Mapping, _CustomRenderingViewPath, _Compatible themes
- `Site` - Site, _Forms Folder Location, _Role Domain, _Modules
- `Tenant` Tenant, _Forms Folder Location, _Role Domain, _Modules  

## New site
[TODO]

## A site and its theme
When a site has no theme assigned it will fallback to the **Wireframe** theme.

Assign theme:
- Experience Editor: select **Experience Accelerator** tab, click **Theme**, select for **Default** the required theme
- Content Editor: On `/sitecore/content/<tenant>/<site>/Presentation/Page Designs` - field `Styling:Theme` set value of `Default` to the required theme. It is also possible to create additional values 

If your theme styles and scripts are preoptimized (advised - use [SXA Umbrella](https://github.com/macaw-interactive/sxa-umbrella)), set on `/sitecore/content/<tenant>/<site>/Presentation/Page Designs`:
- field `Asset Optimization: Styles Optimizing Enabled` to `No`
- field `Asset Optimization: Scripts Optimizing Enabled` to `No`

on `/sitecore/content/<tenant>/<site>/Presentation/Page Designs` - field `Designing:Template to Design Mapping` [TODO]


- 
## Extending SXA

Create SXA extensions in the `/sitecore/Templates` folder using custom items outside standard SXA sections.
SXA follows the [Sitecore Helix solution architecture](https://helix.sitecore.net/introduction/index.html), a set of conventions used in Sitecore applications to provide a modular architecture which helps you manage dependencies. In this solution architecture Sitecore Helix defines three layers:

![Helix layers](https://helix.sitecore.net/_images/image7.png)

Those layers you will find back in everything Sitecore does, that is why you see folders named:
- [foundation](https://helix.sitecore.net/principles/architecture-principles/layers.html#foundation-layer) - base logic shared by multiple features 
- [feature](https://helix.sitecore.net/principles/architecture-principles/layers.html#feature-layer) - concrete features as understood by business owners and editors
- [project](https://helix.sitecore.net/principles/architecture-principles/layers.html#project-layer) - context of the solution

### Create a new module
A module is selectable when scaffolding a new tenant or site (or can be added afterward). A module is also required to add new renderings.

Module can be created at tenant and/or site level.

Based on Helix layer structure create a new module using `Insert > Module` at one of the following *layers*:
- Foundation - `/sitecore/System/Settings/Foundation`
- Feature - `/sitecore/System/Settings/Feature`
- Project - `/sitecore/System/Settings/Project`

Initially select all system areas for which container folders should be created:
- **Templates** - `/sitecore/templates/<layer>/<module>`
- **Branches** - `/sitecore/templates/branches/<layer>/<module>`
- **Settings** - `/sitecore/system/settings/<layer>/<module>` with
  - sub-item `<module> site setup` for site setup
    - `Add Available Renderings` - template: AddItem
    - `Add <rendering>s Data Item` - template: AddItem (for each rendering)
    - `Rendering Variants` (folder)
      - `<rendering>` - template: AddItem (for each rendering)
  - sub-item `<module> tenant setup` for tenant setup
    - ...
- **Renderings** - `/sitecore/layout/renderings/<layer>/<module>`
- **Placeholder Settings** - `/sitecore/layout/placeholder settings/<layer>/<module>`
- **Layouts** - `/sitecore/layout/layouts/<layer>/<module>`
- **Media Library** - `/sitecore/media library/<layer>/<module>`

### Create a new rendering
Considerations for new rendering: *Rendering Parameters* vs *Data Source* - can be used together

- **Rendering Parameters:** 
  - template for data - `/sitecore/templates/<layer>/<module>/Rendering Parameters/<rendering>`
  - for configuration specific for rendering instance
  - edit through "Edit component properties", editing in context (overlay)
  - no extra item to be published
  - 
- **Data Source:**
  - template for data - `/sitecore/templates/<layer>/<module>/<rendering>`
  - data in a completely separate item (must be published as well)
  - edit through "Edit the related item", editing in Content Editor
  - inline editing in Experience Editor (if wanted)
  - for content, supporting multiple language versions
  - reusable over multiple rendering instances on multiple pages
  - supports personalization and A/B testing
  
New rendering can be created in two ways:
1. On `/sitecore/Layout/Renderings/<layer>/<module>` select `Insert > Component` to start a wizard to create a new component (*no further details - a lot of manual configuration*)
2. Clone an existing rendering - preferred approach, and described below

#### Clone a rendering
If you need a rendering with **Rendering Parameters & Data Source**: 

* clone the **Promo** rendering `/sitecore/layout/Renderings/Feature/Experience Accelerator/Page Content/Promo` using `Scripts > Clone Rendering`

If you need a rendering with **Rendering Parameters** only:

* clone the **Page Content** rendering `/sitecore/layout/Renderings/Feature/Experience Accelerator/Page Content/Page Content` using `Scripts > Clone Rendering`
  
In the **Clone rendering** wizard make the following selections:

**GENERAL tab:**
- New rendering name: `<rendering>`
- Add to module: `<layer>/<module>` (use module created above)
- Rendering CSS class: `<rendering>` - this is the class name used to identify the rendering

**PARAMETERS tab:**
- Rendering Parameters: `Make a copy of original rendering parameters`

**DATASOURCE tab:**
- Datasource: `Make a copy of original datasource` (empty for **Page Content** rendering)

**VIEW tab:**

On the view tab we have two approaches: 
1. stay with the use of the original MVC view file (`~/Views/Variants/Page Content.cshtml` or `~/Views/Variants/Promo.cshtml)`
2. have custom view files for **Rendering Parameters & Data Source** or **Rendering Parameters** only

The second approach is our preference, because it is cleaner. The only difference is that the original MVC view files have a default class (`content` or `promo`) if no override is given in the **GENERAL tab**.

Given the second approach specify the following arguments on the **View tab**:
- View: `Select existing MVC view file (specify path below)`
- Path to rendering view: `~/DMPViews/Views/Variants/GenericParametersAndDataSource.cshtml` or `~/DMPViews/Views/Variants/GenericParameters.cshtml`

The views are located at `c:\inetpub\wwwroot\<sitecore webroot>\DMPViews\Views\Variants\` and have the following content:

`~/DMPViews/Views/Variants/GenericParametersAndDataSource.cshtml` (derived from the **Promo** view file `~/Views/Variants/Promo.cshtml`):

```c#
@using Sitecore.XA.Foundation.MarkupDecorator.Extensions
@using Sitecore.XA.Foundation.RenderingVariants.Extensions
@using Sitecore.XA.Foundation.RenderingVariants.Fields
@using Sitecore.XA.Foundation.SitecoreExtensions.Extensions
@using Sitecore.XA.Foundation.Variants.Abstractions.Fields
@model Sitecore.XA.Foundation.Variants.Abstractions.Models.VariantsRenderingModel

@if (Model.DataSourceItem != null || Html.Sxa().IsEdit)
{
    <div @Html.Sxa().Component(Model.Rendering.RenderingCssClass ?? "", Model.Attributes)>
        <div class="component-content">
            @if(Model.DataSourceItem == null)
            {
                @Model.MessageIsEmpty
            }
            else
            {
                foreach (BaseVariantField variantField in Model.VariantFields)
                {
                    @Html.RenderingVariants().RenderVariant(variantField, Model.Item, Model.RenderingWebEditingParams, Model)
                }
            }
        </div>
    </div>
}
```

`~/DMPViews/Views/Variants/GenericParameters.cshtml` (derived from the **Page Content** view file `~/Views/Variants/Page Content.cshtml`):

```c#
@using Sitecore.XA.Foundation.MarkupDecorator.Extensions
@using Sitecore.XA.Foundation.RenderingVariants.Extensions
@using Sitecore.XA.Foundation.RenderingVariants.Fields
@using Sitecore.XA.Foundation.SitecoreExtensions.Extensions
@using Sitecore.XA.Foundation.Variants.Abstractions.Fields

@model Sitecore.XA.Foundation.Variants.Abstractions.Models.VariantsRenderingModel

<div @Html.Sxa().Component(Model.Rendering.RenderingCssClass ?? "", Model.Attributes)>
    <div class="component-content">
        @if (Model.Item != null)
        {
            foreach (BaseVariantField variantField in Model.VariantFields)
            {
                @Html.RenderingVariants().RenderVariant(variantField, Model.Item, Model.RenderingWebEditingParams, Model)
            }
        }
    </div>
</div>
```

The following items are created for the new rendering:

- `/sitecore/layout/renderings/<layer>/<module>/<rendering>`
- 
- `/sitecore/templates/<layer>/<module>/rendering parameters/<rendering>` - defines the rendering parameters, use **Builder**  tab for defining sections and fields.
  When using the [`DMP Bootstrap 4` grid by Barend Emmerzaal](https://www.linkedin.com/pulse/empower-sitecore-end-users-achieve-great-results-barend-emmerzaal) no **Grid Parameters** are required, and on this item the **Grid Parameters** template can be removed from the `Base template` to optimize the UI in the **Edit component properties** functionality accessible on a rendering in the Experience Editor
- `/sitecore/system/settings/<layer>/<module>/<module> site setup/rendering variants/<rendering>`
- `/sitecore/system/settings/<layer>/<module>/<module> site setup/add <rendering>s data item`
- `/sitecore/templates/branches/<layer>/<module>/default <rendering> variant

When cloning the **Promo** rendering (to get both **Rendering Parameters & Data Source**) we also get the item:
- `/sitecore/templates/<layer>/<module>/<rendering>` - defines the parameters in the data source, use **Builder**  tab for defining sections and fields
- `/sitecore/templates/<layer>/<module>/<rendering> folder` - template for the folder `/sitecore/content/<tenant>/<site>/Data/<rendering>` to hold the data sources for this type or renderings

### Add rendering to toolbox

The Experience Editor contains a toolbox with the available renderings organized in sections. The sections and their renderings are managed per site at the following location `/sitecore/content/<tenant>/<site>/Presentation/Available Renderings`. Use `Insert > Available Renderings` to create a new section. On a section edit the field `Data:Renderings` to add/remove renderings in the section.

### Add data folder for rendering data sources
On `/sitecore/content/<layer>/<module>` select `Insert > Insert from template` to create a new data folder for items for your new component. 