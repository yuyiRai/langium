/******************************************************************************
 * This file was generated by langium-cli 0.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { AstNode, AstReflection, Reference } from '../../syntax-tree';
import { isAstNode } from '../../utils/ast-util';

export interface AbstractElement extends AstNode {
    readonly $container: ParserRule | Alternatives | UnorderedGroup | Group | Assignment | CrossReference | TerminalRule | TerminalAlternatives | TerminalGroup | NegatedToken | UntilToken | CharacterRange;
    cardinality: '?' | '*' | '+'
}

export const AbstractElement = 'AbstractElement';

export function isAbstractElement(item: unknown): item is AbstractElement {
    return reflection.isInstance(item, AbstractElement);
}

export interface AbstractRule extends AstNode {
    readonly $container: Grammar;
    fragment: boolean
    name: string
    type: string
}

export const AbstractRule = 'AbstractRule';

export function isAbstractRule(item: unknown): item is AbstractRule {
    return reflection.isInstance(item, AbstractRule);
}

export interface Annotation extends AstNode {
    name: string
}

export const Annotation = 'Annotation';

export function isAnnotation(item: unknown): item is Annotation {
    return reflection.isInstance(item, Annotation);
}

export interface Condition extends AstNode {
    readonly $container: NamedArgument | Disjunction | Conjunction | Negation;
}

export const Condition = 'Condition';

export function isCondition(item: unknown): item is Condition {
    return reflection.isInstance(item, Condition);
}

export interface Grammar extends AstNode {
    definesHiddenTokens: boolean
    hiddenTokens: Array<Reference<AbstractRule>>
    imports: Array<GrammarImport>
    name: string
    rules: Array<AbstractRule>
    usedGrammars: Array<Reference<Grammar>>
}

export const Grammar = 'Grammar';

export function isGrammar(item: unknown): item is Grammar {
    return reflection.isInstance(item, Grammar);
}

export interface GrammarImport extends AstNode {
    readonly $container: Grammar;
    path: string
}

export const GrammarImport = 'GrammarImport';

export function isGrammarImport(item: unknown): item is GrammarImport {
    return reflection.isInstance(item, GrammarImport);
}

export interface NamedArgument extends AstNode {
    readonly $container: RuleCall;
    calledByName: boolean
    parameter?: Reference<Parameter>
    value: Condition
}

export const NamedArgument = 'NamedArgument';

export function isNamedArgument(item: unknown): item is NamedArgument {
    return reflection.isInstance(item, NamedArgument);
}

export interface Parameter extends AstNode {
    readonly $container: ParserRule;
    name: string
}

export const Parameter = 'Parameter';

export function isParameter(item: unknown): item is Parameter {
    return reflection.isInstance(item, Parameter);
}

export interface Action extends AbstractElement {
    feature: string
    operator: '=' | '+='
    type: string
}

export const Action = 'Action';

export function isAction(item: unknown): item is Action {
    return reflection.isInstance(item, Action);
}

export interface Alternatives extends AbstractElement {
    elements: Array<AbstractElement>
}

export const Alternatives = 'Alternatives';

export function isAlternatives(item: unknown): item is Alternatives {
    return reflection.isInstance(item, Alternatives);
}

export interface Assignment extends AbstractElement {
    feature: string
    firstSetPredicated: boolean
    operator: '+=' | '=' | '?='
    predicated: boolean
    terminal: AbstractElement
}

export const Assignment = 'Assignment';

export function isAssignment(item: unknown): item is Assignment {
    return reflection.isInstance(item, Assignment);
}

export interface CharacterRange extends AbstractElement {
    left: Keyword
    right: Keyword
}

export const CharacterRange = 'CharacterRange';

export function isCharacterRange(item: unknown): item is CharacterRange {
    return reflection.isInstance(item, CharacterRange);
}

export interface CrossReference extends AbstractElement {
    deprecatedSyntax: boolean
    terminal: AbstractElement
    type: Reference<ParserRule>
}

export const CrossReference = 'CrossReference';

export function isCrossReference(item: unknown): item is CrossReference {
    return reflection.isInstance(item, CrossReference);
}

export interface Group extends AbstractElement {
    elements: Array<AbstractElement>
    firstSetPredicated: boolean
    predicated: boolean
}

export const Group = 'Group';

export function isGroup(item: unknown): item is Group {
    return reflection.isInstance(item, Group);
}

export interface Keyword extends AbstractElement {
    firstSetPredicated: boolean
    predicated: boolean
    value: string
}

export const Keyword = 'Keyword';

export function isKeyword(item: unknown): item is Keyword {
    return reflection.isInstance(item, Keyword);
}

export interface NegatedToken extends AbstractElement {
    terminal: AbstractElement
}

export const NegatedToken = 'NegatedToken';

export function isNegatedToken(item: unknown): item is NegatedToken {
    return reflection.isInstance(item, NegatedToken);
}

export interface RegexToken extends AbstractElement {
    regex: string
}

export const RegexToken = 'RegexToken';

export function isRegexToken(item: unknown): item is RegexToken {
    return reflection.isInstance(item, RegexToken);
}

export interface RuleCall extends AbstractElement {
    arguments: Array<NamedArgument>
    firstSetPredicated: boolean
    predicated: boolean
    rule: Reference<AbstractRule>
}

export const RuleCall = 'RuleCall';

export function isRuleCall(item: unknown): item is RuleCall {
    return reflection.isInstance(item, RuleCall);
}

export interface TerminalAlternatives extends AbstractElement {
    elements: Array<AbstractElement>
}

export const TerminalAlternatives = 'TerminalAlternatives';

export function isTerminalAlternatives(item: unknown): item is TerminalAlternatives {
    return reflection.isInstance(item, TerminalAlternatives);
}

export interface TerminalGroup extends AbstractElement {
    elements: Array<AbstractElement>
}

export const TerminalGroup = 'TerminalGroup';

export function isTerminalGroup(item: unknown): item is TerminalGroup {
    return reflection.isInstance(item, TerminalGroup);
}

export interface TerminalRuleCall extends AbstractElement {
    rule: Reference<TerminalRule>
}

export const TerminalRuleCall = 'TerminalRuleCall';

export function isTerminalRuleCall(item: unknown): item is TerminalRuleCall {
    return reflection.isInstance(item, TerminalRuleCall);
}

export interface UnorderedGroup extends AbstractElement {
    elements: Array<AbstractElement>
}

export const UnorderedGroup = 'UnorderedGroup';

export function isUnorderedGroup(item: unknown): item is UnorderedGroup {
    return reflection.isInstance(item, UnorderedGroup);
}

export interface UntilToken extends AbstractElement {
    terminal: AbstractElement
}

export const UntilToken = 'UntilToken';

export function isUntilToken(item: unknown): item is UntilToken {
    return reflection.isInstance(item, UntilToken);
}

export interface Wildcard extends AbstractElement {
}

export const Wildcard = 'Wildcard';

export function isWildcard(item: unknown): item is Wildcard {
    return reflection.isInstance(item, Wildcard);
}

export interface ParserRule extends AbstractRule {
    alternatives: AbstractElement
    definesHiddenTokens: boolean
    entry: boolean
    hiddenTokens: Array<Reference<AbstractRule>>
    parameters: Array<Parameter>
    wildcard: boolean
}

export const ParserRule = 'ParserRule';

export function isParserRule(item: unknown): item is ParserRule {
    return reflection.isInstance(item, ParserRule);
}

export interface TerminalRule extends AbstractRule {
    hidden: boolean
    terminal: AbstractElement
}

export const TerminalRule = 'TerminalRule';

export function isTerminalRule(item: unknown): item is TerminalRule {
    return reflection.isInstance(item, TerminalRule);
}

export interface Conjunction extends Condition {
    left: Condition
    right: Condition
}

export const Conjunction = 'Conjunction';

export function isConjunction(item: unknown): item is Conjunction {
    return reflection.isInstance(item, Conjunction);
}

export interface Disjunction extends Condition {
    left: Condition
    right: Condition
}

export const Disjunction = 'Disjunction';

export function isDisjunction(item: unknown): item is Disjunction {
    return reflection.isInstance(item, Disjunction);
}

export interface LiteralCondition extends Condition {
    true: boolean
}

export const LiteralCondition = 'LiteralCondition';

export function isLiteralCondition(item: unknown): item is LiteralCondition {
    return reflection.isInstance(item, LiteralCondition);
}

export interface Negation extends Condition {
    value: Condition
}

export const Negation = 'Negation';

export function isNegation(item: unknown): item is Negation {
    return reflection.isInstance(item, Negation);
}

export interface ParameterReference extends Condition {
    parameter: Reference<Parameter>
}

export const ParameterReference = 'ParameterReference';

export function isParameterReference(item: unknown): item is ParameterReference {
    return reflection.isInstance(item, ParameterReference);
}

export type LangiumGrammarAstType = 'AbstractElement' | 'AbstractRule' | 'Annotation' | 'Condition' | 'Grammar' | 'GrammarImport' | 'NamedArgument' | 'Parameter' | 'Action' | 'Alternatives' | 'Assignment' | 'CharacterRange' | 'CrossReference' | 'Group' | 'Keyword' | 'NegatedToken' | 'RegexToken' | 'RuleCall' | 'TerminalAlternatives' | 'TerminalGroup' | 'TerminalRuleCall' | 'UnorderedGroup' | 'UntilToken' | 'Wildcard' | 'ParserRule' | 'TerminalRule' | 'Conjunction' | 'Disjunction' | 'LiteralCondition' | 'Negation' | 'ParameterReference';

export type LangiumGrammarAstReference = 'Grammar:hiddenTokens' | 'Grammar:usedGrammars' | 'NamedArgument:parameter' | 'CrossReference:type' | 'RuleCall:rule' | 'TerminalRuleCall:rule' | 'ParserRule:hiddenTokens' | 'ParameterReference:parameter';

export class LangiumGrammarAstReflection implements AstReflection {

    getAllTypes(): string[] {
        return ['AbstractElement', 'AbstractRule', 'Annotation', 'Condition', 'Grammar', 'GrammarImport', 'NamedArgument', 'Parameter', 'Action', 'Alternatives', 'Assignment', 'CharacterRange', 'CrossReference', 'Group', 'Keyword', 'NegatedToken', 'RegexToken', 'RuleCall', 'TerminalAlternatives', 'TerminalGroup', 'TerminalRuleCall', 'UnorderedGroup', 'UntilToken', 'Wildcard', 'ParserRule', 'TerminalRule', 'Conjunction', 'Disjunction', 'LiteralCondition', 'Negation', 'ParameterReference'];
    }

    isInstance(node: unknown, type: string): boolean {
        return isAstNode(node) && this.isSubtype(node.$type, type);
    }

    isSubtype(subtype: string, supertype: string): boolean {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            case Action:
            case Alternatives:
            case Assignment:
            case CharacterRange:
            case CrossReference:
            case Group:
            case Keyword:
            case NegatedToken:
            case RegexToken:
            case RuleCall:
            case TerminalAlternatives:
            case TerminalGroup:
            case TerminalRuleCall:
            case UnorderedGroup:
            case UntilToken:
            case Wildcard: {
                return this.isSubtype(AbstractElement, supertype);
            }
            case ParserRule:
            case TerminalRule: {
                return this.isSubtype(AbstractRule, supertype);
            }
            case Conjunction:
            case Disjunction:
            case LiteralCondition:
            case Negation:
            case ParameterReference: {
                return this.isSubtype(Condition, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(referenceId: LangiumGrammarAstReference): string {
        switch (referenceId) {
            case 'Grammar:hiddenTokens': {
                return AbstractRule;
            }
            case 'Grammar:usedGrammars': {
                return Grammar;
            }
            case 'NamedArgument:parameter': {
                return Parameter;
            }
            case 'CrossReference:type': {
                return ParserRule;
            }
            case 'RuleCall:rule': {
                return AbstractRule;
            }
            case 'TerminalRuleCall:rule': {
                return TerminalRule;
            }
            case 'ParserRule:hiddenTokens': {
                return AbstractRule;
            }
            case 'ParameterReference:parameter': {
                return Parameter;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }
}

export const reflection = new LangiumGrammarAstReflection();
