export interface FabricItem {
  slug: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  description: string;
  gsmRange: string;
  applications: string[];
  image: string;
  banner: string;
  features: string[];
  weaveType: string;
  finishing: string[];
}

export const FABRICS: FabricItem[] = [
  {
    slug: 'crepe-fabrics',
    title: 'Crepe Fabrics',
    subtitle: 'Soft/silky fabrics with smooth feel',
    shortDesc: 'Pebbled texture with fluid drape and high elasticity for everyday fashion.',
    description: 'Soft/silky fabrics with smooth feel. used for designing garments, scarves, textile products The weight falls in the range of 75-120 grams / meter. Our fabrics are available in solid dyed or printed forms by Make to order base.',
    gsmRange: '75 - 120 GSM',
    applications: ['Office Formals', 'Crepe Sarees', 'Casual Tops', 'Palazzos', 'Dresses'],
    image: '/assets/uploads/2025/09/crepe-fabrics-1.png',
    banner: '/assets/uploads/2025/09/crepe-fabrics-banner.png',
    features: ['Distinctive pebbled crinkle surface', 'Flowing drape', 'Low maintenance & anti-crease', 'Durable polyester core'],
    weaveType: 'High-twist Crepe Weave',
    finishing: ['Solid Dyed', 'All-over Rotary Print', 'Custom Digital Print']
  },
  {
    slug: 'bsy-fabrics',
    title: 'BSY Fabrics',
    subtitle: 'Soft/silky fabrics with smooth feel',
    shortDesc: 'Bi-Shrinkage Yarn fabric known for peach-skin touch and superior fall.',
    description: 'BSY (Bi-Shrinkage Yarn) fabrics are polyester fabrics made by combining two yarns of different shrinkage rates, producing a distinctive, soft, “brushed” effect. The weight falls in the range of 80-180 grams / meter.',
    gsmRange: '80 - 180 GSM',
    applications: ['Abayas', 'Burqas', 'Flowy Kurtis', 'Scarves', 'High-end Modest Fashion'],
    image: '/assets/uploads/2025/09/bsy-fabrics.png',
    banner: '/assets/uploads/2025/09/bsy-fabrics-banner.png',
    features: ['Unique peach-skin touch', 'Deep color fastness', 'Excellent drape retention', 'Resistant to wrinkling'],
    weaveType: 'Specialized Bi-Shrinkage Intermingled Weave',
    finishing: ['Jet Dyed Jet Black Special', 'Soft Peached Finish', 'Anti-Static']
  },
  {
    slug: 'chiffon-fabrics',
    title: 'Chiffon Fabrics',
    subtitle: 'Soft/silky fabrics with smooth feel',
    shortDesc: 'Ultra-lightweight, translucent fabric with exceptional grace and airy flow.',
    description: 'Poly Chiffon is a lightweight, sheer fabric with a slightly rough, crinkled texture that gives it a distinctive bounce and floaty drape. The weight falls in the range of 35-100 grams / meter. Poly Chiffon Fabric is used in garments, stoles, scarves.',
    gsmRange: '35 - 100 GSM',
    applications: ['Dupattas', 'Flowing Gowns', 'Scarves & Stoles', 'Layered Tops', 'Bridal Wear'],
    image: '/assets/uploads/2025/09/chiffon-fabrics-1.png',
    banner: '/assets/uploads/2025/09/chiffon-fabrics-banner.png',
    features: ['Feather-light weight', 'Delicate crinkle finish', 'Breathable sheer texture', 'Vibrant dye absorption'],
    weaveType: 'Plain Balanced Weave with S & Z twist',
    finishing: ['Solid Pastel & Vibrant Dyes', 'Digital Prints', 'Ombre Dip Dye']
  },
  {
    slug: 'georgette-fabrics',
    title: 'Georgette Fabrics',
    subtitle: 'Soft/silky fabrics with smooth feel',
    shortDesc: 'Characteristic crinkly surface, bouncy drape, and semi-sheer finish.',
    description: 'The georgette fabrics are plain weave with a crinkle effect, excellent feel and good drapability. The weight falls in the range of 35-130 grams / meter. It is most preferred in garment industry for designer top wear, dresses, and gowns. These fabrics are available in various solid colors and printed patterns.',
    gsmRange: '35 - 130 GSM',
    applications: ['Anarkalis', 'Designer Tops', 'Flowing Evening Gowns', 'Sarees', 'Dupattas'],
    image: '/assets/uploads/2025/09/georgette-fabrics-1.png',
    banner: '/assets/uploads/2025/09/georgette-fabrics-banner.png',
    features: ['Crinkle bouncy feel', 'Semi-sheer elegance', 'High tensile strength', 'Holds pleats cleanly'],
    weaveType: 'Plain Weave with alternating twisted yarns',
    finishing: ['Solid Reactive Dyeing', 'High-Definition Digital Printing']
  },
  {
    slug: 'net-mesh-fabrics',
    title: 'Net & Mesh Fabrics',
    subtitle: 'Soft/Silky Fabrics With Smooth Feel',
    shortDesc: 'Openwork geometric meshes engineered for breathability and structural fashion.',
    description: 'Net & Mesh Fabrics are suitable for designing bags, clothes, dresses, interlinings, athletic apparel, and various other home furnishing items. Engineered with precision holes and tear-resistant filament fibers.',
    gsmRange: '40 - 150 GSM',
    applications: ['Activewear Inserts', 'Gown Petticoats', 'Interlinings', 'Bags & Accessories', 'Home Furnishings'],
    image: '/assets/uploads/2025/09/net-fabrics.png',
    banner: '/assets/uploads/2025/09/net-fabrics-banner.png',
    features: ['High ventilation mesh', 'Shape retention', 'Tear-resistant knit construction', 'Lightweight flexibility'],
    weaveType: 'Open Mesh Raschel / Tricot Knit',
    finishing: ['Heat-set Finished', 'Dyed', 'Glitter / Foil Accents']
  },
  {
    slug: 'poly-dobby-fabrics-jacquard',
    title: 'Poly Dobby Fabrics Jacquard',
    subtitle: 'Soft/silky fabrics with smooth feel',
    shortDesc: 'Geometric dobby patterns and rich jacquard motifs woven on advanced looms.',
    description: 'Elegantly patterned Dobby Fabrics are highly utilized for designing Tops, dresses, garments, and various home furnishing items on a Make-to-Order base. This woven fabric is designed by implementation of high-speed dobby looms as per the latest market trends.',
    gsmRange: '70 - 160 GSM',
    applications: ['Men & Women Shirts', 'Textured Kurtas', 'Home Furnishings', 'Dresses'],
    image: '/assets/uploads/2025/09/poly-dobby.png',
    banner: '/assets/uploads/2025/09/poly-dobby-banner.png',
    features: ['Intricate geometric self-patterns', 'Raised dobby texture', 'Crisp hand feel', 'Excellent dye consistency'],
    weaveType: 'Dobby & Jacquard Engineered Weave',
    finishing: ['Yarn Dyed Look', 'Piece Dyed', 'Soft-touch Mill Finished']
  },
  {
    slug: 'poly-knit-fabrics',
    title: 'Poly Knit Fabrics',
    subtitle: 'Soft/silky fabrics with smooth feel',
    shortDesc: 'Multi-directional stretch, soft hand feel, and thermal comfort for modern apparel.',
    description: 'Knitted Fabrics are widely used in lingerie, sportswear, dresses, lining, and winter garments. The fabrics are highly valued for their outstanding features like comfortable to wear and soft texture. The weight falls in the range of 80-200 grams / meter.',
    gsmRange: '80 - 200 GSM',
    applications: ['Athleisure', 'T-Shirts & Tops', 'Lingerie & Lining', 'Tracksuits', 'Sportswear'],
    image: '/assets/uploads/2025/09/poly-knit-fabrics-1.png',
    banner: '/assets/uploads/2025/09/poly-knit-fabrics-banner.png',
    features: ['4-Way Stretch elasticity', 'Skin-friendly softness', 'Quick-dry moisture transport', 'Pilling resistant'],
    weaveType: 'Circular Knit / Interlock / Single Jersey',
    finishing: ['Bio-Polished', 'Brushed Fleece', 'Dry-Fit Finished']
  },
  {
    slug: 'recycled-fabrics',
    title: 'Recycled Fabrics',
    subtitle: 'Soft/silky fabrics with smooth feel',
    shortDesc: 'Eco-conscious sustainable fabrics manufactured from post-consumer PET bottle recycled yarns.',
    description: 'We also deals in Recycled Fabrics which are made with RECYCLED YARN, a yarn made from waste pet bottles. It is ideal for sustainable apparel collections and eco-friendly garments.',
    gsmRange: '60 - 180 GSM',
    applications: ['Sustainable Apparel', 'Eco Fashion Collections', 'Corporate Uniforms', 'Tote Bags', 'Scarves'],
    image: '/assets/uploads/2025/09/recycled-fabrics.png',
    banner: '/assets/uploads/2025/09/recycled-fabrics-banner.png',
    features: ['GRS / OEKO-TEX compliant yarns', 'Eco-friendly carbon footprint', 'Same silky touch as virgin poly', 'High color vibrancy'],
    weaveType: 'Recycled Filament Woven & Knit',
    finishing: ['Eco-certified Low Impact Dyeing', 'Digital Print']
  },
  {
    slug: 'satin-fabrics',
    title: 'Satin Fabrics',
    subtitle: 'Soft/silky fabrics with smooth feel',
    shortDesc: 'Luxurious high-gloss sheen with ultra-smooth hand feel on face side.',
    description: 'The Polyester Satin Fabrics is ideally used for designing home decors, garments, and scarves. Satin is not the raw material, it is the weave of the fabric. The polyester satin is a luxurious smooth, silky, and glossy fabric having one shiny and one dull side. It is appreciated for color fastness, vibrant color patterns, skin friendliness, and soft texture. The weight falls in the range of 80-170 grams / meter.',
    gsmRange: '80 - 170 GSM',
    applications: ['Nightwear & Lingerie', 'Evening Gowns', 'Luxury Lining', 'Cushion Covers', 'Scrunchies & Scarves'],
    image: '/assets/uploads/2025/09/satin-fabrics-1.png',
    banner: '/assets/uploads/2025/09/satin-fabrics-banner.png',
    features: ['High luster silky sheen', 'Smooth liquid-like drape', 'Color-fast brilliance', 'Skin-friendly hypoallergenic touch'],
    weaveType: 'Five-harness Satin Weave',
    finishing: ['Solid High-Gloss Finish', 'Digital Sublimation Print', 'Silicone Wash']
  },
  {
    slug: 'viscose-fabrics',
    title: 'Viscose Fabrics',
    subtitle: 'Designing clothes, Dresses, Lining, Scarves',
    shortDesc: 'Breathable cellulose-blend fabrics delivering natural silk-like drape and comfort.',
    description: 'Viscose Fabrics are widely used in garment and textile industries for designing clothes, dresses, lining, and scarves. These fabrics are designed by precise blending of natural cellulose and synthetic components in compliance with quality norms laid down by the international fashion industry.',
    gsmRange: '85 - 160 GSM',
    applications: ['Summer Dresses', 'Kurtis & Tunics', 'Scarves & Stoles', 'Blouses', 'Jackets Lining'],
    image: '/assets/uploads/2025/09/viscose-fabrics.png',
    banner: '/assets/uploads/2025/09/viscose-fabrics-banner.png',
    features: ['Natural cellulose drape', 'High breathability & cooling feel', 'Exceptional color brilliance', 'Super-soft hand touch'],
    weaveType: 'Plain & Twill Woven Blends',
    finishing: ['Mill Dyed', 'Traditional Discharge Print', 'Digital Reactive Print']
  }
];
