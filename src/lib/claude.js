/**
 * Appel à l'API Claude via un proxy backend (Supabase Edge Function)
 * pour ne pas exposer la clé API côté client.
 */
export async function generateWithClaude(prompt, systemPrompt = '') {
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text ?? ''
}

// Prompts spécialisés NaturoVie
export const prompts = {
  nutritionPlan: (profil) =>
    `Tu es un naturopathe expert. Crée un plan nutritionnel de 7 jours pour : ${JSON.stringify(profil)}.
     Réponds en JSON avec la structure { jours: [{ jour, repas: { matin, midi, soir, collations }, calories, proteines, notes }] }`,

  cureDetox: (profil) =>
    `Tu es un naturopathe expert. Propose une cure détox de 14 jours pour : ${JSON.stringify(profil)}.
     Réponds en JSON avec { nom, durée, objectif, étapes: [{ jour, actions, plantes, aliments_interdits }] }`,

  activitePhysique: (profil) =>
    `Tu es un coach sportif naturopathe. Crée un programme d'activité physique hebdomadaire pour : ${JSON.stringify(profil)}.
     Réponds en JSON avec { semaine: [{ jour, activité, durée, intensité, bienfaits }] }`,

  analyseProduct: (barcode, productName) =>
    `Tu es un naturopathe. Analyse ce produit alimentaire : ${productName} (code: ${barcode}).
     Évalue sa compatibilité avec un mode de vie naturel. Réponds en JSON avec { score: 1-10, verdict, raisons: [], alternatives: [] }`,

  conseilDuJour: (profil) =>
    `Tu es un naturopathe bienveillant. Donne un conseil de santé naturelle personnalisé pour : ${JSON.stringify(profil)}.
     Court, actionnable, inspirant. 2-3 phrases max.`,
}
