/**
 * Ce qu'un modèle sait faire.
 *
 * `type` et non `interface` : ce n'est pas la forme d'un objet, c'est une
 * union de littéraux de chaînes. Conséquence directe : seules ces quatre
 * valeurs existent. Écrire `"text-gen"` quelque part devient une erreur de
 * *compilation*, attrapée avant même que les tests ne tournent — un simple
 * `string` aurait tout accepté.
 */
export type Task =
  | "text-generation"
  | "translation"
  | "image-classification"
  | "speech-to-text";

/**
 * Un modèle du catalogue.
 *
 * `interface` car on décrit la forme d'un objet (la règle du cours).
 */
export interface Model {
  /** Slug URL-safe, unique dans le catalogue. Sert de clé. */
  id: string;
  /** Nom affiché, tel qu'il apparaît sur la model card. */
  name: string;
  /** L'organisation qui publie le modèle, ex. "mistralai". */
  org: string;
  /** `Task` et non `string` : voir plus haut. */
  task: Task;
  /** En milliards. 7.2 pour Mistral-7B : un flottant, donc `number`. */
  parameters: number;
  /** Sur le dernier mois. */
  downloads: number;
  /**
   * Optionnel (`?`) : devstral n'en déclare pas dans les tests.
   * Le type doit accepter les trois modèles, donc ce champ peut manquer.
   * Son type est donc `string | undefined` à la lecture.
   */
  license?: string;
}
