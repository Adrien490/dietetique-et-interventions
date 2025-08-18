import { getContactRequest } from "@/domains/contact-request/features/get-contact-request";
import {
	ContactRequestHeader,
	ContactRequestHeaderSkeleton,
} from "@/domains/contact-request/features/get-contact-request/components";
import { PageContainer } from "@/shared/components/page-container";
import { Suspense } from "react";

type Props = {
	children: React.ReactNode;
	params: Promise<{
		id: string;
	}>;
};

export default async function ContactLayout({ children, params }: Props) {
	const { id } = await params;

	return (
		<PageContainer className="pt-4">
			<Suspense fallback={<ContactRequestHeaderSkeleton />}>
				<ContactRequestHeader
					contactRequestPromise={getContactRequest({ id })}
				/>
			</Suspense>

			{children}
		</PageContainer>
	);
}
