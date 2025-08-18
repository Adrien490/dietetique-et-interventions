# Composants d'Animations

Ce dossier contient des composants d'animations réutilisables utilisant Framer Motion pour votre application Next.js.

**🎯 Nouveauté :** Tous les composants utilisent maintenant `whileInView` permettant aux animations de se réactiver à chaque fois que l'utilisateur revient sur la section (par défaut `once = false`).

## Composants disponibles

### 1. FadeIn

Animation d'apparition avec opacité.

```tsx
import { FadeIn } from "@/shared/components/animations";

<FadeIn
	delay={0.2}
	duration={0.8}
	threshold={0.3}
	once={false}
	className="custom-class"
>
	<div>Contenu qui apparaît</div>
</FadeIn>;
```

**Props :**

- `children`: ReactNode - Le contenu à animer
- `delay?`: number - Délai avant l'animation (par défaut: 0)
- `duration?`: number - Durée de l'animation (par défaut: 0.6)
- `threshold?`: number - Seuil de visibilité pour déclencher l'animation (par défaut: 0.1)
- `once?`: boolean - Animation une seule fois ou à chaque apparition (par défaut: false)
- `className?`: string - Classes CSS supplémentaires

### 2. SlideIn

Animation de glissement depuis différentes directions.

```tsx
import { SlideIn } from "@/shared/components/animations";

<SlideIn direction="up" delay={0.3} distance={100} threshold={0.2} once={false}>
	<div>Contenu qui glisse</div>
</SlideIn>;
```

**Props :**

- `children`: ReactNode - Le contenu à animer
- `direction?`: 'up' | 'down' | 'left' | 'right' - Direction du glissement (par défaut: 'up')
- `delay?`: number - Délai avant l'animation (par défaut: 0)
- `duration?`: number - Durée de l'animation (par défaut: 0.6)
- `distance?`: number - Distance du glissement (par défaut: 50)
- `threshold?`: number - Seuil de visibilité pour déclencher l'animation (par défaut: 0.1)
- `once?`: boolean - Animation une seule fois ou à chaque apparition (par défaut: false)
- `className?`: string - Classes CSS supplémentaires

### 3. ScaleIn

Animation de zoom avec échelle.

```tsx
import { ScaleIn } from "@/shared/components/animations";

<ScaleIn initialScale={0.5} delay={0.4} threshold={0.3} once={false}>
	<div>Contenu qui zoome</div>
</ScaleIn>;
```

**Props :**

- `children`: ReactNode - Le contenu à animer
- `delay?`: number - Délai avant l'animation (par défaut: 0)
- `duration?`: number - Durée de l'animation (par défaut: 0.6)
- `initialScale?`: number - Échelle initiale (par défaut: 0.8)
- `threshold?`: number - Seuil de visibilité pour déclencher l'animation (par défaut: 0.1)
- `once?`: boolean - Animation une seule fois ou à chaque apparition (par défaut: false)
- `className?`: string - Classes CSS supplémentaires

### 4. Stagger

Animation en séquence pour plusieurs éléments enfants.

```tsx
import { Stagger } from "@/shared/components/animations";

<Stagger staggerDelay={0.1} delay={0.2} threshold={0.2} once={false}>
	<div>Premier élément</div>
	<div>Deuxième élément</div>
	<div>Troisième élément</div>
</Stagger>;
```

**Props :**

- `children`: ReactNode - Les éléments à animer en séquence
- `delay?`: number - Délai avant le début de l'animation (par défaut: 0)
- `staggerDelay?`: number - Délai entre chaque élément (par défaut: 0.1)
- `duration?`: number - Durée de l'animation de chaque élément (par défaut: 0.6)
- `threshold?`: number - Seuil de visibilité pour déclencher l'animation (par défaut: 0.1)
- `once?`: boolean - Animation une seule fois ou à chaque apparition (par défaut: false)
- `className?`: string - Classes CSS supplémentaires

### 5. Reveal

Animation au scroll avec détection de la visibilité.

```tsx
import { Reveal } from "@/shared/components/animations";

<Reveal threshold={0.3} once={false}>
	<div>Contenu qui apparaît au scroll</div>
</Reveal>;
```

**Props :**

- `children`: ReactNode - Le contenu à animer
- `delay?`: number - Délai avant l'animation (par défaut: 0)
- `duration?`: number - Durée de l'animation (par défaut: 0.6)
- `threshold?`: number - Seuil de visibilité (par défaut: 0.1)
- `once?`: boolean - Animation une seule fois ou à chaque apparition (par défaut: false)
- `className?`: string - Classes CSS supplémentaires

### 6. Bounce

Animation de rebond avec spring effect.

```tsx
import { Bounce } from "@/shared/components/animations";

<Bounce bounce={0.8} duration={1.2} threshold={0.3} once={false}>
	<div>Contenu qui rebondit</div>
</Bounce>;
```

**Props :**

- `children`: ReactNode - Le contenu à animer
- `delay?`: number - Délai avant l'animation (par défaut: 0)
- `duration?`: number - Durée de l'animation (par défaut: 0.8)
- `bounce?`: number - Intensité du rebond (par défaut: 0.6)
- `threshold?`: number - Seuil de visibilité pour déclencher l'animation (par défaut: 0.1)
- `once?`: boolean - Animation une seule fois ou à chaque apparition (par défaut: false)
- `className?`: string - Classes CSS supplémentaires

### 7. Rotate

Animation de rotation.

```tsx
import { Rotate } from "@/shared/components/animations";

<Rotate initialRotation={90} duration={1} threshold={0.2} once={false}>
	<div>Contenu qui tourne</div>
</Rotate>;
```

**Props :**

- `children`: ReactNode - Le contenu à animer
- `delay?`: number - Délai avant l'animation (par défaut: 0)
- `duration?`: number - Durée de l'animation (par défaut: 0.6)
- `initialRotation?`: number - Rotation initiale en degrés (par défaut: -180)
- `threshold?`: number - Seuil de visibilité pour déclencher l'animation (par défaut: 0.1)
- `once?`: boolean - Animation une seule fois ou à chaque apparition (par défaut: false)
- `className?`: string - Classes CSS supplémentaires

### 8. Slide

Animation de glissement continu en boucle.

```tsx
import { Slide } from "@/shared/components/animations";

<Slide direction="horizontal" speed={15} reverse={false}>
	<div>Contenu qui glisse en continu</div>
</Slide>;
```

**Props :**

- `children`: ReactNode - Le contenu à animer
- `direction?`: 'horizontal' | 'vertical' - Direction du glissement (par défaut: 'horizontal')
- `speed?`: number - Vitesse de l'animation (par défaut: 20)
- `reverse?`: boolean - Sens inverse (par défaut: false)
- `className?`: string - Classes CSS supplémentaires

_Note: Le composant Slide n'utilise pas whileInView car il s'agit d'une animation continue._

## Nouveautés - Animation whileInView

### Réactivation des animations

Par défaut, tous les composants (sauf Slide) ont maintenant `once={false}`, ce qui signifie que les animations se déclenchent à chaque fois que l'élément devient visible dans le viewport.

### Contrôle de la visibilité

Utilisez la prop `threshold` pour contrôler à quel pourcentage de visibilité l'animation se déclenche :

- `0.1` = 10% de l'élément visible
- `0.5` = 50% de l'élément visible
- `1.0` = 100% de l'élément visible

### Exemple d'usage pour une seule activation

Si vous voulez l'ancien comportement (animation une seule fois), passez `once={true}` :

```tsx
<Reveal once={true} threshold={0.3}>
	<div>Animation une seule fois</div>
</Reveal>
```

## Utilisation dans les pages côté serveur

Ces composants sont compatibles avec le rendu côté serveur de Next.js. Ils sont marqués avec `'use client'` pour s'exécuter côté client tout en étant utilisables dans des composants serveur.

```tsx
// Dans une page côté serveur
import { FadeIn, SlideIn, Reveal } from "@/shared/components/animations";

export default function HomePage() {
	return (
		<div>
			<FadeIn once={false}>
				<h1>Titre principal</h1>
			</FadeIn>

			<SlideIn direction="left" delay={0.3} threshold={0.2}>
				<section>Contenu de la section</section>
			</SlideIn>

			<Reveal threshold={0.2} once={false}>
				<footer>Footer qui apparaît au scroll</footer>
			</Reveal>
		</div>
	);
}
```

## Conseils d'utilisation

1. **Performance** : Utilisez des `threshold` appropriés pour éviter les animations trop fréquentes
2. **Accessibilité** : Framer Motion respecte automatiquement les préférences utilisateur `prefers-reduced-motion`
3. **Timing** : Utilisez les délais (`delay`) pour créer des séquences d'animations fluides
4. **Réactivation** : Par défaut, les animations se réactivent à chaque apparition pour une expérience utilisateur plus dynamique
5. **Seuil optimal** : `threshold={0.1}` à `0.3` fonctionne bien pour la plupart des cas d'usage
6. **Combinaison** : Vous pouvez imbriquer les composants pour créer des animations complexes

## Exemple d'utilisation avancée

```tsx
import { Stagger, FadeIn, SlideIn } from "@/shared/components/animations";

export default function ProductGrid() {
	return (
		<FadeIn threshold={0.2} once={false}>
			<h2>Nos produits</h2>
			<Stagger
				staggerDelay={0.1}
				threshold={0.3}
				once={false}
				className="grid grid-cols-3 gap-4"
			>
				{products.map((product) => (
					<SlideIn key={product.id} direction="up" delay={0} threshold={0.1}>
						<ProductCard product={product} />
					</SlideIn>
				))}
			</Stagger>
		</FadeIn>
	);
}
```
