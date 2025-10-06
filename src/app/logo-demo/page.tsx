import type { ReactElement } from "react";
import CircularLogoUploader from "@/components/CircularLogoUploader";
import Container from "@/components/Container";
import Section from "@/components/Section";

export default function LogoDemoPage(): ReactElement {
  const handleImageUpload = (imageUrl: string, file: File) => {
    console.log("Image uploaded:", { imageUrl, file });
    // Here you could save to your backend or state management
  };

  return (
    <Section className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="mafia-heading text-4xl lg:text-5xl text-accent-text mb-6">
              Circular Logo Uploader
            </h1>
            <p className="text-lg text-accent-text-light">
              Téléchargez et convertissez vos images en logos circulaires professionnels
            </p>
          </div>

          {/* Demo Section */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Uploader Component */}
            <div className="space-y-6">
              <h2 className="mafia-heading text-2xl text-accent-text mb-4">
                Téléchargeur de Logo
              </h2>
              
              <div className="luxury-card p-8 rounded-xl">
                <CircularLogoUploader
                  onImageUpload={handleImageUpload}
                  maxFileSize={5}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent-text">
                  Fonctionnalités:
                </h3>
                <ul className="space-y-2 text-accent-text-light">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-primary rounded-full"></span>
                    Glisser-déposer ou clic pour télécharger
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-primary rounded-full"></span>
                    Formats supportés: JPG, PNG, WebP
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-primary rounded-full"></span>
                    Taille maximale: 5MB
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-primary rounded-full"></span>
                    Design responsive (40px → 60px)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-primary rounded-full"></span>
                    Accessibilité complète
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-primary rounded-full"></span>
                    Optimisation web
                  </li>
                </ul>
              </div>
            </div>

            {/* Usage Examples */}
            <div className="space-y-6">
              <h2 className="mafia-heading text-2xl text-accent-text mb-4">
                Exemples d&apos;Utilisation
              </h2>

              {/* Different Sizes Demo */}
              <div className="luxury-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-accent-text mb-4">
                  Tailles Responsives:
                </h3>
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-accent-primary rounded-full flex items-center justify-center text-white text-xs font-bold mb-2">
                      40px
                    </div>
                    <p className="text-xs text-accent-text-light">Mobile</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-primary rounded-full flex items-center justify-center text-white text-xs font-bold mb-2">
                      50px
                    </div>
                    <p className="text-xs text-accent-text-light">Tablet</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-primary rounded-full flex items-center justify-center text-white text-xs font-bold mb-2">
                      60px
                    </div>
                    <p className="text-xs text-accent-text-light">Desktop</p>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="luxury-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-accent-text mb-4">
                  Code d&apos;Exemple:
                </h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`import CircularLogoUploader from "@/components/CircularLogoUploader";

<CircularLogoUploader
  onImageUpload={(imageUrl, file) => {
    // Handle uploaded image
    console.log(imageUrl, file);
  }}
  maxFileSize={5}
  initialImage="/path/to/image.jpg"
/>`}
                </pre>
              </div>

              {/* Accessibility Features */}
              <div className="luxury-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-accent-text mb-4">
                  Accessibilité:
                </h3>
                <ul className="space-y-2 text-sm text-accent-text-light">
                  <li>• Alt text automatique</li>
                  <li>• Navigation clavier</li>
                  <li>• ARIA labels</li>
                  <li>• Messages d&apos;erreur annoncés</li>
                  <li>• Contraste élevé</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Features */}
          <div className="mt-12 luxury-card p-8 rounded-xl">
            <h2 className="mafia-heading text-2xl text-accent-text mb-6 text-center">
              Optimisations Performance
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-accent-text mb-2">Chargement Lazy</h3>
                <p className="text-sm text-accent-text-light">
                  Images chargées uniquement quand nécessaire
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-accent-text mb-2">Responsive</h3>
                <p className="text-sm text-accent-text-light">
                  Tailles adaptées à chaque appareil
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold text-accent-text mb-2">CSS Optimisé</h3>
                <p className="text-sm text-accent-text-light">
                  Styles intégrés pour performance maximale
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
