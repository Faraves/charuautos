import { SubscriptionPlan } from '../types/payment';

export const CHARU_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'charu_driver_monthly',
    name: 'CharuPro Conductor Inteligente',
    targetAudience: 'B2C_Conductor',
    priceUsd: 4.99,
    billingPeriod: 'monthly',
    recommendedBadge: 'MÁS POPULAR',
    features: [
      'Exportación ilimitada de Pasaportes Criptográficos PDF',
      'Cadena inmutable SHA-256 de odómetro sin límite de bloques',
      'Cálculo de $/km y Bs./km bimonetario con histórico',
      'Escudo Anti-Estafas ampliado con preguntas clave para mecánicos',
      'Alertas preventivas por fallas de octanaje de gasolina en Venezuela'
    ]
  },
  {
    id: 'charu_inspection_single',
    name: 'Certificado de Traspaso Seguro',
    targetAudience: 'B2C_Conductor',
    priceUsd: 9.99,
    billingPeriod: 'one_time',
    features: [
      'Emisión de 1 Certificado Oficial con Código QR de verificación',
      'Auditoría matemática de no-alteración de odómetro',
      'Sello de garantía para vender o comprar un auto usado sin desconfianza',
      'Válido por 90 días en la red pública de verificación'
    ]
  },
  {
    id: 'charu_workshop_monthly',
    name: 'Taller Aliado Verificado',
    targetAudience: 'B2B_Taller',
    priceUsd: 29.99,
    billingPeriod: 'monthly',
    recommendedBadge: 'PARA MECÁNICOS',
    features: [
      'Insignia de Taller Verificado en el mapa y directorio',
      'Recepción de solicitudes de revisión pre-compra de compradores',
      'Capacidad de firmar y sellar digitalmente servicios técnicos',
      'Acceso a base de datos de causas 80/20 de fallas mecánicas en Venezuela'
    ]
  }
];

export const VENEZUELAN_BANKS = [
  { code: '0102', name: 'Banco de Venezuela (BDV)' },
  { code: '0134', name: 'Banesco Banco Universal' },
  { code: '0105', name: 'Banco Mercantil' },
  { code: '0108', name: 'Banco Provincial (BBVA)' },
  { code: '0172', name: 'Bancamiga' },
  { code: '0114', name: 'Bancaribe' }
];

export const DEFAULT_BCV_RATE = 36.50;
