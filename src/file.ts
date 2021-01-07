const fs = require('fs');

interface FileGetter {
	get(path:string): Promise<string>;
}

class FsFileGetter {
	public async get(path:string): Promise<string> {
		return fs.readFileSync(path, {'encoding': 'utf-8'});
	}
}

export {
	FileGetter,
	FsFileGetter,
}
