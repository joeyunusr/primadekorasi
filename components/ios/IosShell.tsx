'use client';

import React, { useState } from 'react';
import { IosTabBar } from '@/components/ios/IosTabBar';
import { IosQuickToolsModal } from '@/components/ios/IosQuickToolsModal';

export function IosShell() {
  const [isQuickToolsOpen, setIsQuickToolsOpen] = useState(false);

  return (
    <>
      {/* Sleek Mini Floating Bottom Tab Bar / Dock */}
      <IosTabBar onOpenQuickTools={() => setIsQuickToolsOpen(true)} />

      {/* iOS Estimator Action Sheet */}
      <IosQuickToolsModal
        isOpen={isQuickToolsOpen}
        onClose={() => setIsQuickToolsOpen(false)}
      />
    </>
  );
}
