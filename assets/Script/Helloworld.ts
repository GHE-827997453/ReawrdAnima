const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    private _list: fgui.GList;

    protected onLoad(): void {
        fgui.GRoot.create();
        fgui.UIPackage.loadPackage('fui/act', this.loaded.bind(this));
    }

    private loaded(err: any, pkg: fairygui.UIPackage): void {
        if (!!err) {
            console.error('act pkg load err:', err);
            return;
        }
        const root = fgui.GRoot.inst;
        const window = fgui.UIPackage.createObject('activity', 'main').asCom;
        root.addChild(window);
        window.onClick(this.do, this);
        this._list = window.getChild("list").asList;
    }

    private reset(): void {
        const children = this._list.numChildren;
        if (children > 0) {
            for (let i = 0; i < children; i++) {
                const child = this._list.getChildAt(i);
                child.visible = false;
            }
        }
    }

    private do(): void {
        this.reset();
        const children = this._list.numChildren;
        if (children > 0) {
            for (let i = 0; i < children; i++) {
                const child = this._list.getChildAt(i);
                setTimeout(() => {
                    child.visible = true;
                }, 80 * i);
            }
        }
    }

    /**
     * 获取展示延迟
     * @param i 随i递增每个奖励展示间隔越来越小
     * @returns 
     */
    private getDelay(i: number): number {
        const base = 150;
        let acc = 50;
        const offset = 5;
        let delay = base;
        if (i != 0) {
            for (let j = 0; j < i; j++) {
                delay += acc;
                acc -= offset;
            }
        }
        return delay;
    }
}
