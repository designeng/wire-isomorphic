import context from 'essential-wire/source/lib/context';

export default function createContext(spec) {
    return context(spec, null, { require: require });
}