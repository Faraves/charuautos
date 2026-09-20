import { DTCCodeDefinition } from '../types/dtc';
import { VENEZUELAN_DTC_SEED } from '../data/dtc.seed';

/**
 * Motor de Consulta y Diagnóstico OBD2 Manual
 */
export class DTCLookupEngine {
  private dtcCatalog: Map<string, DTCCodeDefinition>;

  constructor(seed: DTCCodeDefinition[] = VENEZUELAN_DTC_SEED) {
    this.dtcCatalog = new Map();
    seed.forEach((item) => {
      this.dtcCatalog.set(item.code.toUpperCase().trim(), item);
    });
  }

  /**
   * Busca un código DTC por su nomenclatura oficial (ej: "P0420" o "p0420").
   */
  public findCode(rawCode: string): DTCCodeDefinition | null {
    const cleanCode = rawCode.toUpperCase().trim();
    return this.dtcCatalog.get(cleanCode) || null;
  }

  /**
   * Búsqueda difusa por palabras clave (ej: "oxigeno", "catalizador", "misfire").
   */
  public searchByKeyword(keyword: string): DTCCodeDefinition[] {
    const q = keyword.toLowerCase().trim();
    return Array.from(this.dtcCatalog.values()).filter((item) => 
      item.code.toLowerCase().includes(q) ||
      item.plainSpanishExplanation.toLowerCase().includes(q) ||
      item.technicalTitle.toLowerCase().includes(q)
    );
  }

  /**
   * Obtiene todos los códigos clasificados por severidad.
   */
  public getBySeverity(severity: 1 | 2 | 3): DTCCodeDefinition[] {
    return Array.from(this.dtcCatalog.values()).filter((item) => item.severity === severity);
  }
}
