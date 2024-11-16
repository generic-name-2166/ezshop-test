import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SerializedFile {
  name: string;
  type: string;
  url: string;
}

export function serializeFile(file: File): SerializedFile {
  return {
    name: file.name,
    type: file.type,
    url: URL.createObjectURL(file),
  };
}

export async function deserializeFile(file: SerializedFile): Promise<File> {
  const { name, type, url } = file;
  const blob = await fetch(url).then((file) => file.blob());
  return new File([blob], name, { type });
}

interface FileState {
  files: SerializedFile[];
}

const initialState: FileState = {
  files: [],
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    replace(
      _state: FileState,
      action: PayloadAction<SerializedFile[]>,
    ): FileState {
      return { files: action.payload };
    },
    clear(): FileState {
      return { files: [] };
    },
  },
});

export const { clear, replace } = filesSlice.actions;

export default filesSlice.reducer;
