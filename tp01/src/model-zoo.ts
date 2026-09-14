import type { Model, Task } from "./model.js";

/**
 * Le catalogue de modèles.
 */
export class ModelZoo {
  /**
   * Le choix de structure de données, la vraie décision de ce TP.
   *
   * `Map<string, Model>` indexée par `id`, et non `Model[]`, pour trois raisons :
   *
   * 1. `getModel(id)` devient un accès direct (coût constant), là où un tableau
   *    imposerait de parcourir tous les éléments jusqu'à trouver le bon.
   * 2. Le test « remplace un modèle au lieu de le dupliquer » est gratuit :
   *    réécrire une clé existante écrase la valeur. Avec un tableau, il faudrait
   *    chercher l'index, puis remplacer ou pousser à la main.
   * 3. L'unicité des `id` annoncée par l'énoncé est garantie par la structure
   *    elle-même, pas par du code de vérification.
   *
   * Le prix à payer : `getAllModels()` doit convertir en tableau. C'est une
   * opération peu fréquente face à des recherches par identifiant.
   *
   * `private`  : personne à l'extérieur ne touche à la collection.
   * `readonly` : on ne peut pas remplacer la Map elle-même après construction.
   */
  private readonly models = new Map<string, Model>();

  /**
   * Ajoute un modèle, ou remplace celui qui porte déjà le même `id`.
   * `set` fait les deux : c'est le comportement attendu par les tests.
   */
  addModel(model: Model): void {
    this.models.set(model.id, model);
  }

  /**
   * Le type de retour `Model | undefined` n'est pas un choix : c'est ce que
   * `Map.get` renvoie, et c'est ce que le test attend pour un id inconnu.
   * Le compilateur force ainsi l'appelant à gérer le cas « pas trouvé ».
   */
  getModel(id: string): Model | undefined {
    return this.models.get(id);
  }

  /**
   * `values()` renvoie un itérateur ; le spread `[...]` le déroule en tableau.
   * On renvoie donc une copie : l'appelant peut trier ou filtrer le résultat
   * sans toucher au catalogue.
   */
  getAllModels(): Model[] {
    return [...this.models.values()];
  }

  /** `size` est fourni par la Map : aucun compteur à maintenir soi-même. */
  getTotalNumberOfModels(): number {
    return this.models.size;
  }

  /**
   * `filter` plutôt qu'une boucle `for` : on décrit ce qu'on veut garder,
   * pas comment parcourir. Renvoie naturellement `[]` si rien ne correspond,
   * ce qu'exige le test sur une organisation inconnue.
   */
  getModelsOf(org: string): Model[] {
    return this.getAllModels().filter((model) => model.org === org);
  }

  /**
   * Le paramètre est typé `Task`, pas `string` : appeler
   * `getModelsByTask("text-gen")` est refusé à la compilation.
   */
  getModelsByTask(task: Task): Model[] {
    return this.getAllModels().filter((model) => model.task === task);
  }
}
