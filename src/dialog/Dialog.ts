export class Dialog {
    isOpen: boolean = false;
    result!: (value: boolean | PromiseLike<boolean> ) => void;

    open(): Promise<boolean> {
        this.isOpen = true;
        return new Promise((resolve, reject) => {
            this.result = resolve
        })
    }

    confirm() {
        this.result!(true)
        this.isOpen = false;
    }

    cancel() {
        this.result(false)
        this.isOpen = false;
    }
}
