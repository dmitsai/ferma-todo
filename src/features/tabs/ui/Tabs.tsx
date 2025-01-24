'use client';
import { Button } from "~/shared/components/button";
import { type TabsValues, tabsValues as tabs } from "../model/state";
import cn from 'classnames';

export interface TabsProps {
    selected: TabsValues,
    setSelected: (selected: TabsValues) => void;
}

export const Tabs: React.FC<TabsProps> = (props) => {
    const { selected, setSelected } = props;

    return (
        <div className={'flex flex-row gap-x-4'}>
            <Button
                label={tabs.all}
                className={cn('border-primary hover:bg-sea hover:text-white focus:border-sub', selected === tabs.all ? 'bg-primary text-white' : 'text-primary')}
                onClick={() => { setSelected(tabs.all) }}
            />
            <Button
                label={tabs.done}
                className={cn('border-green hover:bg-sub-green hover:text-green focus:border-sub-green', selected === tabs.done ? 'bg-green text-white' : 'text-green')}
                onClick={() => { setSelected(tabs.done) }}
            />
            <Button
                label={tabs.open}
                className={cn('border-red hover:bg-sub-red hover:text-red focus:border-sub-red', selected === tabs.open ? 'bg-red text-white' : 'text-red')}
                onClick={() => { setSelected(tabs.open) }}
            />
        </div>
    )
}