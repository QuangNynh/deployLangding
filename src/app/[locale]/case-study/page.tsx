import React from 'react';
import { CustomersSection } from '@/components/case-study/CustomersSection';
import ImpressiveStatsSection from '@/components/case-study/ImpressiveStatsSection';
import { IntroduceSection } from '@/components/case-study/IntroduceSection';
import { PartnerSection } from '@/components/case-study/PartnerSection';
import { CaseStudy } from '@/components/case-study/CaseStudy';
import { CommentCustomer } from '@/components/case-study/CommentCustomer';

const CaseStudyPage = () => {
    return (
        <div className="dark:bg-gray-900">
            <div className="container">
                <IntroduceSection />
                <ImpressiveStatsSection />
                <PartnerSection />
                <CustomersSection />
                <CaseStudy />
                <CommentCustomer />
            </div>
        </div>
    );
};

export default CaseStudyPage;
