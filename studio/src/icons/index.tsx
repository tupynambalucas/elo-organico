/**
 * Elo Organico - Canonical Icon System
 * Powered by FontAwesome, managed by @studio.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { 
  faList, 
  faUsers, 
  faCarrot, 
  faChartSimple, 
  faGear, 
  faArrowRightFromBracket,
  faBoxOpen,
  faArrowLeft,
  faSave,
  faPen,
  faTrash,
  faSync,
  faExclamationTriangle,
  faTimes,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faEye,
  faEyeSlash,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

/**
 * Canonical Icon component for Elo Organico.
 * Wraps FontAwesomeIcon using forwardRef to maintain full compatibility 
 * with React refs and ensure maximum type safety.
 */
export const Icon = React.forwardRef<SVGSVGElement, FontAwesomeIconProps>((props, ref) => {
  return <FontAwesomeIcon {...props} ref={ref} />;
});

Icon.displayName = 'Icon';

// Re-export specific icons to avoid multiple FontAwesome dependencies in apps
export {
  faList, 
  faUsers, 
  faCarrot, 
  faChartSimple, 
  faGear, 
  faArrowRightFromBracket,
  faBoxOpen,
  faArrowLeft,
  faSave,
  faPen,
  faTrash,
  faSync,
  faExclamationTriangle,
  faTimes,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faEye,
  faEyeSlash,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation,
  faGithub
};

// Export entire sets if the user needs more flexibility (optional but recommended for hub)
export * as SolidIcons from '@fortawesome/free-solid-svg-icons';
export * as RegularIcons from '@fortawesome/free-regular-svg-icons';
export * as BrandIcons from '@fortawesome/free-brands-svg-icons';
