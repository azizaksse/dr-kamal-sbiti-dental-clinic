# 🏥 Clinic Brand Name Locations Guide

This document lists all locations where the clinic brand name appears in the codebase and website. Use this guide to efficiently update your brand name across the entire application.

## 🎯 Quick Change Strategy

**Most Efficient Approach:**
1. Update `src/config/site.ts` first (this automatically updates many locations)
2. Update individual component files 
3. Rename image files
4. Update domain/email references if needed

---

## 📍 Brand Name Locations

### **🔧 Core Configuration (START HERE)**

| File | Variable/Property | Current Value | Description |
|------|------------------|---------------|-------------|
| `src/config/site.ts` | `name` | `"Clinique Dentaire Tibaoui"` | **Main brand name** - Updates metadata automatically |
| `src/config/site.ts` | `baseUrl` | `"https://www.clinique-tibaoui.dz"` | Website URL |
| `src/config/site.ts` | `email` | `"contact@clinique-tibaoui.dz"` | Contact email |

---

### **💻 Source Code Files**

| File | Line(s) | Location | Current Text | Notes |
|------|---------|----------|--------------|-------|
| `src/app/layout.tsx` | ~40 | Page title | `${siteConfig.name} — Clinique Dentaire` | Uses config variable |
| `src/app/layout.tsx` | ~47 | OpenGraph title | `${siteConfig.name} — Clinique Dentaire` | Uses config variable |
| `src/app/layout.tsx` | ~65 | Twitter title | `${siteConfig.name} — Clinique Dentaire` | Uses config variable |
| `src/app/about/page.tsx` | ~6 | Page title | `"À propos - Clinique Dentaire Tibaoui"` | **Manual update needed** |
| `src/app/about/page.tsx` | ~52 | Hero heading | `"TIBAOUI"` | **Manual update needed** |
| `src/app/about/page.tsx` | ~80 | Content text | `"la Clinique Tibaoui s'est imposée..."` | **Manual update needed** |
| `src/components/Navbar.tsx` | ~15 | Brand link | `"Clinique Tibaoui"` | **Manual update needed** |
| `src/components/Hero.tsx` | ~29 | Hero heading | `"Dentaire Tibaoui"` | **Manual update needed** |
| `src/components/Footer.tsx` | ~25 | Brand name | `"Clinique Tibaoui"` | **Manual update needed** |
| `src/components/Footer.tsx` | ~85 | Copyright | `"© {year} Clinique Tibaoui"` | **Manual update needed** |

---

### **📁 Static Files**

| File | Type | Description | Action Required |
|------|------|-------------|-----------------|
| `public/tibaoui-pitts21.png` | Image | Product/technique image | **Rename file** + update references |
| `src/app/page.tsx` | Code | Image reference | Update path: `"/tibaoui-pitts21.png"` |

---

### **👁️ Website Visitor-Visible Locations**

#### **All Pages (Header & Footer)**
- ✅ **Navigation Bar**: "Clinique Tibaoui" → Update `src/components/Navbar.tsx`
- ✅ **Footer Brand**: "Clinique Tibaoui" → Update `src/components/Footer.tsx`  
- ✅ **Footer Copyright**: "© 2025 Clinique Tibaoui" → Update `src/components/Footer.tsx`
- ✅ **Browser Tab Title**: Shows config name → Auto-updates from `siteConfig.name`

#### **Home Page**
- ✅ **Hero Section**: "Dentaire Tibaoui" → Update `src/components/Hero.tsx`

#### **About Page**
- ✅ **Main Heading**: "CLINIQUE TIBAOUI" → Update `src/app/about/page.tsx`
- ✅ **Page Title**: "À propos - Clinique Dentaire Tibaoui" → Update `src/app/about/page.tsx`
- ✅ **Content Text**: "la Clinique Tibaoui s'est imposée..." → Update `src/app/about/page.tsx`

#### **Contact Page**  
- ✅ **Email Display**: "contact@clinique-tibaoui.dz" → Auto-updates from `siteConfig.email`

---

## 🔄 Step-by-Step Rebranding Process

### **Step 1: Update Core Configuration**
```typescript
// File: src/config/site.ts
export const siteConfig = {
  name: "YOUR_NEW_CLINIC_NAME",
  baseUrl: "https://www.your-new-domain.dz",
  email: "contact@your-new-domain.dz",
  // ... rest remains the same
};
```

### **Step 2: Update Component Files**
Update these files manually with your new brand name:

1. **`src/components/Navbar.tsx`** (line ~15)
2. **`src/components/Hero.tsx`** (line ~29) 
3. **`src/components/Footer.tsx`** (lines ~25, ~85)
4. **`src/app/about/page.tsx`** (lines ~6, ~52, ~80)

### **Step 3: Handle Image Files**
1. Rename `public/tibaoui-pitts21.png` to match new brand
2. Update image reference in `src/app/page.tsx`

### **Step 4: Update Domain/Email (if applicable)**
- Update `baseUrl` and `email` in config
- Update any hardcoded email addresses
- Update DNS/hosting settings externally

### **Step 5: Test & Verify**
- Run `npm run build` to check for errors
- Test all pages visually
- Check browser tab titles
- Verify footer copyright
- Test contact form email references

---

## 🎨 Brand Customization Tips

### **Colors & Styling**
Brand colors are defined in `src/app/globals.css`:
```css
:root {
  --accent-primary: #2c5aa0;
  --accent-secondary: #00b4d8;
  /* Update these for new brand colors */
}
```

### **Logo/Icon Changes**
- Update favicon files in `public/` folder
- Update any logo images
- Consider updating the crown icon in navbar if not suitable

### **SEO & Metadata**
- Update meta descriptions in `src/app/layout.tsx`
- Update OpenGraph images if they contain old branding
- Update any schema markup with new business information

---

## ⚠️ Important Notes

- **Always backup your files before making changes**
- **Test thoroughly after each change**
- **Update external services** (Google My Business, social media, etc.)
- **The `siteConfig` variable automatically updates many locations**
- **Some locations require manual updates** (marked with "Manual update needed")
- **Remember to update your domain/hosting if changing URLs**

---

## 📝 Rebranding Checklist

- [ ] Update `src/config/site.ts`
- [ ] Update `src/components/Navbar.tsx`
- [ ] Update `src/components/Hero.tsx`  
- [ ] Update `src/components/Footer.tsx`
- [ ] Update `src/app/about/page.tsx`
- [ ] Rename and update image files
- [ ] Test build (`npm run build`)
- [ ] Visual test all pages
- [ ] Update external services
- [ ] Update domain/hosting (if applicable)

---

*Last updated: August 2025*
*Current brand: "Clinique Dentaire Tibaoui"*