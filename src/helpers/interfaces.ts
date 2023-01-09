export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData extends LoginFormData {
    password2: string;
}

export interface ProfilePhotoFormData {
    profilePhoto: FileList;
}

export interface UserPageProps {
    loggedIn: boolean;
}

export interface SearchFormData {
    keyword: string;
}

export interface SearchFormProps {
    setKeyword: (value: string) => void;
}

export interface LikedWordsProps {
    def: DefinitionObj;
    key: string;
};

// export interface DefinedWordObj {
//     word: string;
// }

export interface DefinitionObj {
    definition: string;// znam te nazwy własności, bo spojrzałam sobie do konsoli i rozwinęłam artykuł o indexie 0
    partOfSpeech: string;
};