# ESTA.PK — PHASE 3A: REPLACE RAYS-BRANDED IMAGES AND VALIDATE ALL PATHS

Continue the existing ESTA Pakistan repository. The supplied audit shows that the asset library still includes Rays-branded banners and appliance photos. Fix image branding and asset paths only. Do NOT redesign the website.

## NON-NEGOTIABLE DESIGN RULES
- Preserve the current homepage DOM, section order, Woodmart/Elementor styling, CSS, spacing, colors, card dimensions, responsive behavior, header, menus, and footer.
- Do not rebuild or modernize the website.
- Never edit `reference/index.html` or `reference/styles.css`.
- Only change active asset files and the smallest set of references required.

## STEP 1 — INVENTORY EVERY IMAGE SOURCE
Inspect every raster image in `esta-site/assets/`, every HTML `src`, `data-src`, `srcset`, CSS background, inline `data:image` thumbnail, and all image paths in `products.json` and templates.

For each image record: exact path, where used, visible content, visible Rays/competitor branding on banner or appliance body, product/category match, verified exact ESTA photo versus illustrative/reference image, and keep/replace/review decision. Inspect the actual pixels; do not infer authenticity from filenames.

## STEP 2 — GENERATE REPLACEMENTS FOR WRONG-BRAND IMAGES
Use Google AI Studio's image generation capability to generate replacement product photography only for images that contain competitor branding, are broken, or mismatch their category. Do not regenerate suitable images.

Prioritize:
- All five promotional banners: small appliances, built-in microwave ovens, built-in ovens, hobs, and hoods.
- Appliance photos with a visible Rays mark printed on the product.
- `Rays-3-in-1-Hand-Blender-RHB-1000.webp`.
- `Rays-90cm-Wall-Mounted-Kitchen-Hood-HCF-22.webp`.
- Any inline base64 thumbnails that visibly contain competitor branding.

### Image generation requirements
- Premium realistic commercial appliance photography, not an illustration or website mockup.
- Product cards: clean white or very light neutral background.
- Wide banners: premium kitchen context, with clean negative space for existing page layout.
- Consistent studio lighting, believable materials, accurate proportions, realistic shadows and crisp edges.
- Absolutely no captions, text, watermarks, competitor logos, fake labels, invented control markings, or fake model numbers.
- Do not put the ESTA logo on a physical appliance unless an approved product reference image supplied by the owner confirms that exact logo.
- Preserve existing image dimensions/aspect ratios and crop so the website layout does not change.
- Save optimized WebP files where supported, with descriptive filenames.

### Authenticity guardrail
A generated image is not proof of an exact product model. If no verified ESTA reference photo exists, classify generated imagery as illustrative and record this in the report. Do not invent specifications or claims. If exact model accuracy is essential and no reference exists, flag it for owner-provided photography rather than guessing.

## STEP 3 — UPDATE ALL REFERENCES
- Replace wrong-brand image paths in homepage HTML, CSS, templates, and product data.
- Update `products.json` so each product points to the correct local replacement image.
- Rename old `Rays` filenames only after replacing the actual image and updating every reference. Renaming alone does not remove branding printed on the appliance.
- Check HTML `src`, `data-src`, responsive `srcset`, CSS `url()`, JavaScript, templates, and product JSON.
- Ensure no old image remains loaded from a hidden responsive source or inline base64 thumbnail.
- Preserve all existing dimensions and layout.

## STEP 4 — AUDIT OLD URLS AND LOCAL PATHS
Search active files for `rays.com.pk`, `new.rays.com.pk`, `Rays`, old asset names, and remote image URLs. Classify each match as visible branding, image source, theme/plugin dependency, inactive metadata, or reference-only. Do not blindly replace theme/plugin URLs if that breaks required scripts or styles.

Run a real local path validator across HTML, CSS, JS, templates, and product JSON. Check local image/font/SVG references and every responsive `srcset` path. Do not rely on placeholder build/lint scripts that only print success.

## STEP 5 — SAFE CLEANUP
Remove only files proven unused by HTML, CSS, JS, server runtime, templates, and configuration. Keep `reference/` untouched. Never delete a referenced image until its replacement exists, is wired up, and passes path validation.

## REQUIRED REPORTS
Create/update:
1. `docs/esta-image-audit-final.md` — image sources, brand findings, keep/replace decisions, authenticity status.
2. `docs/esta-generated-image-manifest.md` — each generated image, replaced source, dimensions, usage, and illustrative/verified classification.
3. `docs/esta-path-validation.md` — broken paths fixed, remaining remote URLs and dependencies.
4. `docs/esta-cleanup-report.md` — files removed and proof they were unused.

Report exact files changed/added/deleted, number of images inspected, generated replacements, inline images still containing competitor branding, and unresolved issues. Do not claim success without actual checks.

STOP after image remediation and path validation. Do not redesign the website or build a new homepage.
