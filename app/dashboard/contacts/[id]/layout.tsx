import { getContact } from "@/domains/contact/features/get-contact";
import {
	ContactHeader,
	ContactHeaderSkeleton,
} from "@/domains/contact/features/get-contact/components";
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
			<Suspense fallback={<ContactHeaderSkeleton />}>
				<ContactHeader contactPromise={getContact({ id })} />
			</Suspense>

			{children}
		</PageContainer>
	);
}
