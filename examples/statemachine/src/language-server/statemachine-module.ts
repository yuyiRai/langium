/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import { createSharedModule, LangiumServices, Module, PartialLangiumServices, injectService, LangiumSharedServices, SharedModuleContext } from 'langium';
import { StatemachineGeneratedModule, StatemachineGeneratedSharedModule } from './generated/module';
import { StatemachineValidationRegistry, StatemachineValidator } from './statemachine-validator';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type StatemachineAddedServices = {
    validation: {
        StatemachineValidator: StatemachineValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type StatemachineServices = LangiumServices & StatemachineAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const StatemachineModule: Module<StatemachineServices, PartialLangiumServices & StatemachineAddedServices> = {
    validation: {
        ValidationRegistry: (injector) => new StatemachineValidationRegistry(injector),
        StatemachineValidator: () => new StatemachineValidator()
    }
};

/**
 * Inject the full set of language services by merging three modules:
 *  - Langium default services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 */
export function createStatemachineServices(context?: SharedModuleContext): LangiumSharedServices {
    return injectService(
        createSharedModule(context),
        StatemachineGeneratedSharedModule,
        {
            generated: StatemachineGeneratedModule,
            module: StatemachineModule
        }
    );
}
